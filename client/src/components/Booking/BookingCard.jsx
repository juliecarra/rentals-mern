import React from "react";
import { Link } from "react-router-dom";
import * as moment from "moment";

export function BookingCard(props) {
  const { booking } = props;

  return (
    <div className="col-md-4">
      <div className="card text-center">
        <div className="card-header">
          {booking.rental ? booking.rental.category : "Deleted Rental"}
        </div>
        <div className="card-block">
          {booking.rental && (
            <div>
              <h4 className="card-title">
                {" "}
                {booking.rental.title} - {booking.rental.city}
              </h4>
              <p className="card-text booking-desc">
                {booking.rental.description}
              </p>
            </div>
          )}

          <p className="card-text booking-days">
            {moment(booking.startAt).format("MM/DD/YYYY")} -{" "}
            {moment(booking.endAt).format("MM/DD/YYYY")} | {booking.days} days
          </p>
          <p className="card-text booking-price">
            <span>Price: </span>{" "}
            <span className="booking-price-value">${booking.totalPrice}</span>
          </p>
          {booking.rental && (
            <Link className="btn btn-bwm" to={`/rentals/${booking.rental._id}`}>
              Go to Rental
            </Link>
          )}
        </div>
        <div className="card-footer text-muted">
          Created {moment(booking.createdAt).format("MM/DD/YYYY")}
        </div>
      </div>
    </div>
  );
}

export function PaymentCard(props) {
  const { booking, payment, paymentBtns } = props;

  return (
    <div className="col-md-4">
      <div className="card text-center">
        <div className="card-header">
          Booking made by: {payment.fromUser.username}
        </div>
        <div className="card-block">
          {/* {booking.rental && (
            <div>
              <h4 className="card-title">
                {" "}
                {booking.rental.title} - {booking.rental.city}
              </h4>
              <p className="card-text booking-desc">
                {booking.rental.description}
              </p>
            </div>
          )} */}
          {/* <p className="card-text booking-days">
            {moment(booking.startAt).format("MM/DD/YYYY")} -{" "}
            {moment(booking.endAt).format("MM/DD/YYYY")} | {booking.days} days
          </p> */}
          <p className="card-text booking-price">
            <span>Price: </span>{" "}
            <span className="booking-price-value">${payment.amount / 100}</span>
          </p>
          <p className="card-text payment-status">Status: {payment.status}</p>
          {/* {booking.rental && (
            <Link className="btn btn-bwm" to={`/rentals/${booking.rental._id}`}>
              Go to Rental
            </Link>
          )} */}
        </div>
        <div className="card-footer text-muted">
          {/* Created {moment(booking.createdAt).format("MM/DD/YYYY")} */}
          {payment.status === "pending" && paymentBtns && paymentBtns(payment)}
        </div>
      </div>
    </div>
  );
}
