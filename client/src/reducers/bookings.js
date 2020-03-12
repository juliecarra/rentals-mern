import {
  FETCH_BOOKINGS_INIT,
  FETCH_BOOKINGS,
  GET_ERRORS
} from "../actions/types";

const initialBookingsState = {
  bookings: [],
  errors: [],
  isFetching: false
};

//reducer for bookings
export const bookings = (state = initialBookingsState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS_INIT:
      return { ...state, isFetching: true };
    case FETCH_BOOKINGS:
      // debugger;
      return { ...state, bookings: action.payload, isFetching: false };
    case GET_ERRORS:
      return { ...state, errors: action.payload, isFetching: false };
    default:
      return state;
  }
};
