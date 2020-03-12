var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//defining a schema
var rentalSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  street: {
    type: String
  },
  city: { type: String, required: true, lowercase: true },
  country: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  guests: { type: Number, required: true },
  beds: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  shared: Boolean,
  arrivalTitle: { type: String },
  arrivalDetails: { type: String },
  cleanTitle: { type: String },
  cleanDetails: { type: String },
  checkInTitle: { type: String },
  checkInDetails: { type: String },
  description: { type: String, required: true },
  spaceDescription: { type: String },
  guestsAccessDescription: { type: String },
  sleepingArrangements: { type: String, required: true },
  amenities: { type: Array },
  dailyRate: { type: Number, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
  createdAt: { type: Date, default: Date.now }
});

//creating a model
var Rental = mongoose.model("Rental", rentalSchema);

module.exports = Rental;
