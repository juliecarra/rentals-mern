var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const bookingSchema = new Schema({
  startAt: { type: Date, required: true },
  endAt: { type: Date, required: true },
  totalPrice: Number,
  days: Number,
  guests: Number,
  createdAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  rental: { type: Schema.Types.ObjectId, ref: "Rental" },
  review: { type: Schema.Types.ObjectId, ref: "Review" },
  payment: { type: Schema.Types.ObjectId, ref: "Payment" },
  status: { type: String, default: "pending" }
});

var Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
