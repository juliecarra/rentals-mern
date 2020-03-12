import React, { Component, Fragment } from "react";
import * as moment from "moment";
import Modal from "react-responsive-modal";

class RentalManageModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal = () => {
    this.setState({ open: true });
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  renderBookings = bookings => {
    return bookings.map((booking, i) => (
      <Fragment>
        <p>
          <span>Date:</span> {moment(booking.startAt).format("MM/DD/YYYY")} -{" "}
          {moment(booking.endAt).format("MM/DD/YYYY")}
        </p>
        <p>
          <span>Guests:</span> {booking.guests}
        </p>
        <p>
          <span>Total Price:</span> ${booking.totalPrice}
        </p>

        {i + 1 !== booking.length && <hr></hr>}
      </Fragment>
    ));
  };
  render() {
    const { bookings } = this.props;
    return (
      <Fragment>
        <button
          type="button"
          onClick={this.openModal}
          className="btn"
          style={{ backgroundColor: "#008489" }}
        >
          Bookings
        </button>
        <Modal
          open={this.state.open}
          onClose={this.closeModal}
          little
          classNames={{ modal: "rental-booking-modal" }}
        >
          <h4 className="modal-title title">Your Bookings</h4>
          <div className="modal-body bookings-inner-container">
            {this.renderBookings(bookings)}
          </div>
          <div className="modal-footer">
            <button type="button" onClick={this.closeModal} className="btn">
              Cancel
            </button>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

export default RentalManageModal;
