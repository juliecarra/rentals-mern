import {
  FETCH_RENTALS_INIT,
  FETCH_RENTALS,
  FETCH_RENTALS_BY_ID,
  DELETE_RENTAL,
  GET_ERRORS
} from "../actions/types";

const initialRentalsState = {
  rentals: [],
  errors: []
};

const initialRentalState = {
  rental: []
};

//reducer for rentals
export const rentals = (state = initialRentalsState, action) => {
  switch (action.type) {
    case FETCH_RENTALS_INIT:
      return { ...state };
    case FETCH_RENTALS:
      // debugger;
      return { ...state, rentals: action.payload };
    case DELETE_RENTAL:
      return {
        ...state,
        rentals: state.rentals.filter(rental => rental._id !== action.payload)
      };
    case GET_ERRORS:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};

//reducer for a rental
export const rental = (state = initialRentalState, action) => {
  switch (action.type) {
    case FETCH_RENTALS_BY_ID:
      return { ...state, rental: action.payload };
    default:
      return state;
  }
};
