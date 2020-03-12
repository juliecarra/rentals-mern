import React from "react";
import { Link } from "react-router-dom";
import BookingManage from "../Booking/BookingManage";

const RentalItem = ({ rental }) => {
  const { _id, country, title, dailyRate, image, category } = rental;
  return (
    <Link to={"/rentals/" + _id} className="RentalItem">
      <div className="card" style={{ width: "18rem" }}>
        <img className="card-img-top" src={image} alt="" />
        <div className="card-body">
          <h5 className={`card-title ${category}`}>{country}</h5>
          <h6 className="card-subtitle ">{title}</h6>
          <p className="card-text">
            <strong>${dailyRate}</strong> / night
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RentalItem;
