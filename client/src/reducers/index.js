import { combineReducers } from "redux";

import { rentals, rental } from "./rentals";
import { auth } from "./auth";
import { bookings } from "./bookings";
import { errors } from "./errors";

export default combineReducers({
  rentals,
  rental,
  auth,
  bookings,

  errors
});
