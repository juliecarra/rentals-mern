import React, { Component } from "react";
import RentalManageModal from "./RentalManageModal";
import { deleteRental } from "../../actions/";
import { connect } from "react-redux";
import * as moment from "moment";

import { Link } from "react-router-dom";

class RentalManageCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDelete: false
    };
    this.showDeleteMessage = this.showDeleteMessage.bind(this);
    this.hideDeleteMessage = this.hideDeleteMessage.bind(this);
  }

  showDeleteMessage = () => {
    this.setState({ confirmDelete: true });
  };

  hideDeleteMessage = () => {
    this.setState({ confirmDelete: false });
  };

  deleteRental(rentalId, rentalIndex) {
    this.setState({ confirmDelete: false });

    this.props.deleteRentalCb(rentalId, rentalIndex);
  }

  render() {
    const { rental } = this.props;
    const { confirmDelete } = this.state;

    const deleteClass = confirmDelete ? "toBeDeleted" : "";
    return (
      <div className="col-md-4 manage " key={rental._id}>
        <div className={`card-effect card text-center ${deleteClass}`}>
          <div className="card-block ">
            <img src={rental.image} alt="" className="card-img" />
            <h4 className="card-title">
              {rental.title} - {rental.city}
            </h4>

            <Link
              className="btn"
              to={`/rentals/${rental._id}`}
              style={{ fontWeight: 800 }}
            >
              Go to your Rental
            </Link>
            {rental.bookings && rental.bookings.length > 0 && (
              <RentalManageModal bookings={rental.bookings} />
            )}
          </div>
          <div className="card-footer text-muted">
            Created {moment(rental.createdAt).format("MM/DD/YYYY")}
          </div>
          {!confirmDelete && (
            <div>
              <button
                className="btn"
                style={{ width: "100%", fontWeight: "800" }}
                onClick={this.showDeleteMessage}
              >
                Delete
              </button>
            </div>
          )}
          {confirmDelete && (
            <div>
              <p style={{ color: " rgb(113, 113, 113)" }}>Do you confirm ?</p>{" "}
              <button
                style={{ fontWeight: 800 }}
                className="btn"
                onClick={() => {
                  this.props.deleteRental(rental._id);
                }}
              >
                Yes
              </button>{" "}
              <button
                style={{ fontWeight: 800 }}
                onClick={this.hideDeleteMessage}
                className="btn"
                style={{ backgroundColor: "#008489" }}
              >
                No
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(null, { deleteRental })(RentalManageCard);
