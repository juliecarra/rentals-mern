var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: { type: String, required: true },
  stripeCustomerId: { type: String },
  revenue: { type: Number },
  rentals: [
    {
      type: Schema.Types.ObjectId,
      ref: "Rental"
    }
  ],
  bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }]
});

var User = mongoose.model("User", userSchema);

module.exports = User;
