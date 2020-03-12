const express = require("express");
const router = new express.Router();

const middleware = require("./middlewares/jwt");
const User = require("../models/User");
const Booking = require("../models/Booking");
const Review = require("../models/Review");

/** 
@route    /api/reviews
@method   POST
@desc     add review
@access   private
*/

router.post("", middleware, async (req, res) => {
  const { bookingId } = req.query;
  try {
    const user = await User.findById(req.user.id).select("-password");
    const booking = await Booking.findById(bookingId)
      .populate({ path: "rental", populate: { path: "user" } })
      .populate("review")
      .populate("user");
    const newComment = {
      text: req.body.text,
      review: req.body.review,
      user: req.user.id,
      username: user.username
    };
    await booking.save(newComment);
    res.json(newComment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server Error");
  }
});

module.exports = router;
