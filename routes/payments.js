const express = require("express");
const router = new express.Router();

const Payment = require("../models/Payment");
const Booking = require("../models/Booking");
const Rental = require("../models/Rental");
const User = require("../models/User");

const middleware = require("./middlewares/jwt");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.get("/pending", middleware, async (req, res) => {
  const user = req.user.id;

  try {
    const payment = await Payment.where({ toUser: user })
      .populate({ path: "booking", populate: { path: "rental" } })
      .populate("fromUser")
      .exec();
    return res.status(200).json(payment);
  } catch (error) {
    res.status(500).send("server error");
  }
});

router.post("/confirm", middleware, (req, res) => {
  const payment = req.body;
  const user = req.user.id;

  Payment.findById(payment._id)
    .populate("toUser")
    .populate("booking")
    .exec(async function(err, foundPayment) {
      if (err) {
        return res.status(422).send(err);
      }

      if (
        foundPayment.status === "pending" &&
        user.id === foundPayment.toUser.id
      ) {
        const booking = foundPayment.booking;

        const charge = await stripe.charges.create({
          amount: booking.totalPrice * 100,
          currency: "usd",
          customer: payment.fromStripeCustomerId
        });

        if (charge) {
          Booking.update({ _id: booking }, { status: "active" }, function() {});

          foundPayment.charge = charge;
          foundPayment.status = "paid";

          foundPayment.save(function(err) {
            if (err) {
              return res.status(422).send(err);
            }

            User.update(
              { _id: foundPayment.toUser },
              { $inc: { revenue: foundPayment.amount } },
              function(err, user) {
                if (err) {
                  return res.status(422).send(err);
                }

                return res.json({ status: "paid" });
              }
            );
          });
        }
      }
    });
});

router.post("/decline", (req, res) => {
  const payment = req.body;
  const { booking } = payment;

  Booking.deleteOne({ id: booking._id }, (err, deletedBooking) => {
    if (err) {
      return res.status(422).send(err);
    }

    Payment.update({ _id: payment._id }, { status: "declined" }, function() {});
    Rental.update(
      { _id: booking.rental._id },
      { $pull: { bookings: booking._id } },
      () => {}
    );

    return res.status(200).json({ status: "declined" });
  });
});

module.exports = router;
