import React from "react";
import Modal from "react-responsive-modal";
import { Error } from "../shared/Errors";

const BookingModal = props => {
  const {
    open,
    closeModal,
    booking,
    confirmModal,
    errors,
    rentalPrice,
    acceptPayment,
    disabled
  } = props;
  return (
    <div>
      <Modal
        open={open}
        onClose={closeModal}
        little
        classNames={{ modal: "booking-modal" }}
      >
        <h4 className="modal-title title">Confirm Your Booking </h4>
        <br />
        <p className="dates">
          Check-in: <em>{booking.startAt}</em> - Checkout:{" "}
          <em>{booking.endAt}</em>
        </p>
        <div className="modal-body">
          <p>
            {booking.days === 1 ? "Night" : "Nights"}: <em>{booking.days}</em>{" "}
            {booking.days === 1 ? "night" : "nights"}
          </p>
          <hr />
          <p>
            Price: <em>${rentalPrice}</em> per night
          </p>
          <hr />
          <p>
            {booking.guests === 1 ? "Guest" : "Guests"}:{" "}
            <em>{booking.guests}</em>
          </p>
          <hr />
          <p>
            Total: <em>${booking.totalPrice} </em>
          </p>
          <hr />

          {acceptPayment && acceptPayment()}
          <p>Do you confirm your booking for the selected dates?</p>
        </div>
        <Error errors={errors} />
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-modal btn-confirm"
            onClick={confirmModal}
            disabled={disabled}
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="btn btn-modal btn-cancel"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BookingModal;
