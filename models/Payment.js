const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  fromStripeCustomerId: String,
  amount: Number,
  tokenId: String,
  fromUser: { type: Schema.Types.ObjectId, ref: "User" },
  toUser: [{ type: Schema.Types.ObjectId, ref: "User" }],
  booking: { type: Schema.Types.ObjectId, ref: "Booking" },
  charge: Schema.Types.Mixed,
  status: { type: String, default: "pending" }
});

module.exports = mongoose.model("Payment", paymentSchema);
