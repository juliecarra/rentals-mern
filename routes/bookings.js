const express = require("express");
const { check, validationResult } = require("express-validator");

const router = new express.Router();

const middleware = require("./middlewares/jwt");
const Booking = require("../models/Booking");
const Rental = require("../models/Rental");
const User = require("../models/User");
const Payment = require("../models/Payment");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const CUSTOMER_SHARE = 0.8;

/**
@route    /api/rentals/manage
@method   GET
 @desc    get rentals
@access   private
 */

router.get("/manage", middleware, async (req, res) => {
  const user = req.user.id;

  Booking.where({ user })
    .populate("rental")
    .exec(function(err, foundBookings) {
      if (err) {
        res.status(500).send("server error");
      }
      return res.json(foundBookings);
    });
});

/** 
@route    /api/bookings
@method   POST
@desc     add bookings
@access   private
*/

router.post(
  "/",
  [
    check("startAt", "startAt is required")
      .not()
      .isEmpty(),
    check("endAt", "endAt is required")
      .not()
      .isEmpty()
  ],
  middleware,

  (req, res) => {
    //express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const {
      startAt,
      endAt,
      totalPrice,
      guests,
      days,
      rental,
      paymentToken
    } = req.body;

    const user = req.user.id;

    const booking = new Booking({
      startAt,
      endAt,
      totalPrice,
      guests,
      days
    });

    Rental.findById(rental._id)
      .populate("bookings")
      .populate("user")
      .exec(async function(error, foundRental) {
        if (error) {
          return res.status(500).json(error);
        }

        if (isValidBooking(booking, foundRental)) {
          booking.user = user;
          booking.rental = foundRental;
          foundRental.bookings.push(booking);

          const { payment, err } = await createPayment(
            booking,
            foundRental.user,
            paymentToken
          );

          if (payment) {
            booking.payment = payment;

            booking.save(function(error) {
              if (error) {
                return res.status(500).json(error);
              }

              foundRental.save();
              User.updateOne(
                { _id: req.user.id },
                { $push: { bookings: booking } },
                function() {}
              );

              return res.json({
                startAt: booking.startAt,
                endAt: booking.endAt
              });
            });
          } else {
            return res.status(422).send({
              errors: [
                {
                  title: "Invalid Payment!",
                  detail: err
                }
              ]
            });
          }
        } else {
          //if we already have a booking for the proposed date
          return res.status(422).send({
            errors: [
              {
                title: "Invalid Booking!",
                detail: "Choosen dates are already taken!"
              }
            ]
          });
        }
      });
  }
);

function isValidBooking(proposedBooking, rental) {
  let isValid = true;

  if (rental.bookings && rental.bookings.length > 0) {
    //every means that the conditions are true
    isValid = rental.bookings.every(function(booking) {
      const proposedStart = proposedBooking.startAt;
      const proposedEnd = proposedBooking.endAt;

      const actualStart = booking.startAt;
      const actualEnd = booking.endAt;

      return (
        (actualStart < proposedStart && actualEnd < proposedStart) ||
        (proposedEnd < actualEnd && proposedEnd < actualStart)
      );
    });
  }

  return isValid;
}

async function createPayment(booking, toUser, token) {
  const { user } = booking;
  const tokenId = token.id || token;

  const customer = await stripe.customers.create({
    source: tokenId,
    email: user.email
  });

  if (customer) {
    User.update(
      { _id: user.id },
      { $set: { stripeCustomerId: customer.id } },
      () => {}
    );

    const payment = new Payment({
      fromUser: user,
      toUser,
      fromStripeCustomerId: customer.id,
      booking,
      tokenId: token.id,
      amount: booking.totalPrice * 100 * CUSTOMER_SHARE
    });

    try {
      const savedPayment = await payment.save();
      return { payment: savedPayment };
    } catch (err) {
      return { err: err.message };
    }
  } else {
    return { err: "Cannot process Payment!" };
  }
}

module.exports = router;
