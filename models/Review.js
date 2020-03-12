var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ALLOWED_RATINGS = [1, 2, 3, 4, 5];

const reviewSchema = new Schema({
  rating: Number,
  text: String,
  createdAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  rental: { type: Schema.Types.ObjectId, ref: "Rental" }
});

var Review = mongoose.model("Review", reviewSchema);

module.exports = Review;

reviewSchema.pre("save", function(next) {
  //check if the rating we want to put is inside of the allowed ratings
  if (ALLOWED_RATINGS.indexOf(this.rating) >= 0) {
    next();
  } else {
    const err = new Error({ rating: "Invalid Rating" });
    err.errors = {};
    err.errors.rating = { message: "This rating is not allowed!" };
    next(err);
  }
});
