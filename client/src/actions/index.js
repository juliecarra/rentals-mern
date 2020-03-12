import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  FETCH_RENTALS_INIT,
  FETCH_RENTALS,
  FETCH_RENTALS_BY_ID,
  DELETE_RENTAL,
  GET_ERRORS,
  SET_CURRENT_USER,
  FETCH_BOOKINGS_INIT,
  FETCH_BOOKINGS
} from "./types";

//rentals actions
export const fetchRentals = city => async dispatch => {
  try {
    const url = city ? `/api/rentals?city=${city}` : "/api/rentals";

    dispatch({ type: FETCH_RENTALS_INIT });

    const res = await axios.get(url);
    // debugger;
    dispatch({ type: FETCH_RENTALS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const fetchRentalsById = rentalId => async dispatch => {
  const res = await axios.get(`/api/rentals/${rentalId}`);
  dispatch({ type: FETCH_RENTALS_BY_ID, payload: res.data });
};

export const createRental = (rentalData, history) => async dispatch => {
  try {
    await axios.post("/api/rentals", rentalData);
    history.push("/");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: null
    });
  }
};

export const fetchUserRentals = () => async dispatch => {
  try {
    const res = await axios.get("/api/rentals/manage");
    dispatch({ type: FETCH_RENTALS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const deleteRental = id => async dispatch => {
  try {
    await axios.delete(`/api/rentals/${id}`);
    dispatch({
      type: DELETE_RENTAL,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

// user actions
export const registerUser = (userData, history) => async dispatch => {
  try {
    await axios.post("/api/users/signup", userData);
    history.push("/login"); //If we manage to register, we are redirected to login
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const loginUser = userData => async dispatch => {
  try {
    const res = await axios.post("/api/users/login", userData);

    // Save to localStorage
    const { token } = res.data;
    // Set token to ls
    localStorage.setItem("jwtToken", token);
    // Set token to Auth header
    setAuthToken(token);
    // Decode token to get user data
    const decoded = jwt_decode(token);
    // Set current user
    dispatch(setCurrentUser(decoded));
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

//booking actions
export const createBooking = booking => async dispatch => {
  try {
    const res = await axios.post("/api/bookings", booking);
    debugger;
    dispatch({ payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const fetchUserBookings = () => async dispatch => {
  dispatch({ type: FETCH_BOOKINGS_INIT });
  try {
    const res = await axios.get("/api/bookings/manage");
    // debugger;
    dispatch({ type: FETCH_BOOKINGS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

// Payments actions
export const getPendingPayments = () => {
  debugger;
  return axios
    .get("/api/payments/pending")
    .then(res => res.data)
    .catch(({ response }) => Promise.reject(response.data.errors));
};

export const acceptPayment = payment => {
  return axios
    .post("/api/payments/confirm", payment)
    .then(res => res.data)
    .catch(({ response }) => Promise.reject(response.data.errors));
};

export const declinePayment = payment => {
  return axios
    .post("/api/payments/decline", payment)
    .then(res => res.data)
    .catch(({ response }) => Promise.reject(response.data.errors));
};
