import React, { Component, Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getRangeOfDates } from "../../helpers";
import DateRangePicker from "react-bootstrap-daterangepicker";
import * as moment from "moment";
import BookingModal from "./BookingModal";
import { connect } from "react-redux";
import { createBooking } from "../../actions/";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Payment from "../Payment/Payment";

class Booking extends Component {
  constructor() {
    super();

    //createRef() to display dates on screen
    this.dateRef = React.createRef();
    this.bookedOutDates = [];
    this.state = {
      proposedBooking: {
        startAt: "",
        endAt: "",
        guests: "",
        // rental: {}
        paymentToken: ""
      },
      modal: {
        open: false
      },
      errors: []
    };
    this.handleEvent = this.handleEvent.bind(this);
    this.handleInvalidDates = this.handleInvalidDates.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.confirmReservation = this.confirmReservation.bind(this);
    this.cancelReservation = this.cancelReservation.bind(this);
    this.reserveRental = this.reserveRental.bind(this);
    this.setPaymentToken = this.setPaymentToken.bind(this);
  }

  componentWillMount() {
    this.getBookedOutDates();
  }

  getBookedOutDates() {
    const { bookings } = this.props.rental;

    if (bookings && bookings.length > 0) {
      bookings.forEach(booking => {
        const dateRange = getRangeOfDates(
          booking.startAt,
          booking.endAt,
          "Y/MM/DD"
        );

        this.bookedOutDates.push(...dateRange);
      });
    }
  }

  //check if the bookedOutDates includes the current date and check if the date is not a past date
  handleInvalidDates = date => {
    return (
      this.bookedOutDates.includes(date.format("Y/MM/DD")) ||
      date.diff(moment(), "days") < 0
    );
  };

  handleEvent(event, picker) {
    const startAt = picker.startDate.format("Y/MM/DD");
    const endAt = picker.endDate.format("Y/MM/DD");

    //value that we want to display with createRef()
    this.dateRef.current.value = startAt + " - " + endAt;
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        startAt,
        endAt
      }
    });
  }

  handleOnChange = e => {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        guests: parseInt(e.target.value)
      }
    });
  };

  confirmReservation = () => {
    const { startAt, endAt } = this.state.proposedBooking;
    //count number of days
    const days = getRangeOfDates(startAt, endAt).length - 1;
    const { rental } = this.props;
    this.setState({
      modal: { open: true },
      proposedBooking: {
        ...this.state.proposedBooking,
        days,
        totalPrice: days * rental.dailyRate,
        rental
      }
    });
  };

  cancelReservation = () => {
    this.setState({ modal: { open: false } });
  };

  addNewBookedOutDates(booking) {
    const dateRange = getRangeOfDates(booking.startAt, booking.endAt);
    this.bookedOutDates.push(...dateRange);
  }

  reserveRental = () => {
    this.props
      .createBooking(this.state.proposedBooking)
      .then(booking => {
        // console.log(booking);
        this.cancelReservation();
        this.resetData();
        toast.success("Booking has been succesfully created! Enjoy.");
        this.addNewBookedOutDates(booking);
      })
      .catch(errors => {
        this.setState({ errors });
      });
  };

  resetData() {
    this.dateRef.current.value = "";

    this.setState({ proposedBooking: { guests: "" } });
  }

  setPaymentToken(paymentToken) {
    const { proposedBooking } = this.state;
    proposedBooking.paymentToken = paymentToken;

    this.setState({ proposedBooking });
  }

  render() {
    const { rental } = this.props;
    const { isAuthenticated } = this.props.auth;
    const { startAt, endAt, guests, paymentToken } = this.state.proposedBooking;

    return (
      <div className="booking">
        <ToastContainer />

        <h3 className="booking-price">
          <span className="booking-per-night">
            <span className="price"> ${rental.dailyRate} </span>per night
          </span>
        </h3>

        {!isAuthenticated && (
          <div className="auth">
            <br />
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span className="btn-confirm">Login to book this place</span>{" "}
            </Link>
          </div>
        )}
        <hr></hr>
        {isAuthenticated && (
          <Fragment>
            {" "}
            <div className="form-group">
              <label htmlFor="dates">Dates</label>
              <DateRangePicker
                isInvalidDate={this.handleInvalidDates}
                onEvent={this.handleEvent}
                opens="left"
                containerStyles={{ display: "block" }}
              >
                <input
                  ref={this.dateRef}
                  id="dates"
                  type="text"
                  className="form-control"
                  placeholder="Check-in ——> Checkout"
                ></input>
              </DateRangePicker>
            </div>
            <div className="form-group">
              <label htmlFor="guests">Guests</label>
              <input
                value={guests}
                onChange={this.handleOnChange}
                type="number"
                className="form-control"
                id="guests"
                aria-describedby="guests"
                placeholder="0"
                min="1"
                max="100"
              />
            </div>
            <button
              disabled={!startAt || !endAt || !guests}
              onClick={this.confirmReservation}
              className="btn btn-rental btn-confirm btn-block"
            >
              Reserve
            </button>
            <hr></hr>
          </Fragment>
        )}
        <p className="booking-note-title">
          This place is getting a lot of attention.
        </p>
        <p className="booking-note-text">
          It’s been viewed 500+ times in the past week.
        </p>

        <BookingModal
          open={this.state.modal.open}
          closeModal={this.cancelReservation}
          booking={this.state.proposedBooking}
          confirmModal={this.reserveRental}
          errors={this.state.errors}
          rentalPrice={rental.dailyRate}
          disabled={!paymentToken}
          acceptPayment={() => (
            <Payment setPaymentToken={this.setPaymentToken} />
          )}
        />
      </div>
    );
  }
}

Booking.propTypes = {
  createBooking: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { createBooking })(Booking);
