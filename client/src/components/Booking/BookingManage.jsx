// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import * as moment from "moment";

// import {
//   fetchUserBookings,
//   fetchPendingPayments,
//   confirmPayment,
//   declinePayment
// } from "../../actions";

// import { connect } from "react-redux";

// class BookingManage extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       pendingPayments: []
//     };
//     this.handleConfirmPayment = this.handleConfirmPayment.bind(this);
//     this.onDeclinePayment = this.onDeclinePayment.bind(this);
//   }

//   componentDidMount() {
//     this.props.fetchUserBookings();
//     // this.props.fetchPendingPayments();
//     this.getPendingPayments();
//   }

//   getPendingPayments() {
//     this.props
//       .fetchPendingPayments()
//       .then(pendingPayments => this.setState({ pendingPayments }))
//       .catch(error => console.log(error));
//   }

//   handleConfirmPayment(payment) {
//     this.props
//       .confirmPayment(payment)
//       .then(status => this.getPendingPayments())
//       .catch(err => console.log(err));
//   }

//   onDeclinePayment(payment) {
//     this.props.declinePayment(payment);
//   }

//   render() {
//     const { isAuthenticated } = this.props.auth;
//     const { bookings, isFetching } = this.props;
//     const { payments } = this.props.payments;

//     return (
//       <div>
//         {isAuthenticated && (
//           <section id="userBookings">
//             <h1 className="page-title">My Bookings</h1>
//             <div className="row">
//               {bookings.map(booking => (
//                 <div className="col-md-4">
//                   <div className="card text-center">
//                     <div className="card-header">{booking.rental.category}</div>
//                     <div className="card-block">
//                       <h4 className="card-title">
//                         {" "}
//                         {booking.rental.title} - {booking.rental.city}
//                       </h4>
//                       <p className="card-text booking-desc">
//                         {booking.rental.description}
//                       </p>
//                       <p className="card-text booking-days">
//                         {moment(booking.startAt).format(" MM/DD/YYYY")} -{" "}
//                         {moment(booking.endAt).format("MM/DD/YYYY")} |{" "}
//                         {booking.days} days
//                       </p>
//                       <p className="card-text booking-price">
//                         <span>Price: </span>{" "}
//                         <span className="booking-price-value">
//                           {booking.totalPrice} $
//                         </span>
//                       </p>
//                       {booking.rental && (
//                         <Link
//                           className="btn"
//                           to={`/rentals/${booking.rental._id}`}
//                         >
//                           Go to Rental
//                         </Link>
//                       )}
//                     </div>
//                     <div className="card-footer text-muted">
//                       Created {moment(booking.createdAt).format("MM/DD/YYYY")}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             {!isFetching && bookings.length === 0 && (
//               <div class="alert alert-warning">
//                 You have no bookings created go to rentals section and book your
//                 place today.
//                 <Link
//                   style={{ "margin-left": "10px" }}
//                   class="btn"
//                   to="/rentals"
//                 >
//                   Available Rental
//                 </Link>
//               </div>
//             )}
//           </section>
//         )}
//         {payments.length > 0 && isAuthenticated && (
//           <section id="pendingBookings">
//             <h1 className="page-title">My Pending Bookings</h1>
//             <div className="row">
//               <div className="col-md-4">
//                 {payments.map(payment => (
//                   <div className="card text-center">
//                     <div className="card-header">
//                       Booking made by: {payment.fromUser.username}
//                     </div>
//                     <div className="card-block">
//                       <p className="card-text">Status: {payment.status}</p>

//                       <p className="card-text booking-price">
//                         <span>Price: </span>{" "}
//                         <span className="booking-price-value">
//                           $ {payment.amount}
//                         </span>
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//                 <div className="card-footer text-muted">
//                   <button
//                     className="btn btn-success"
//                     onClick={this.handleConfirmPayment}
//                   >
//                     Accept
//                   </button>
//                   <button
//                     className="btn btn-danger"
//                     onClick={this.onDeclinePayment}
//                   >
//                     Decline
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {payments.length === 0 && (
//               <div class="alert alert-warning">
//                 You have no payments in progress.
//                 <Link
//                   style={{ "margin-left": "10px" }}
//                   class="btn"
//                   to="/rentals"
//                 >
//                   Available Rental
//                 </Link>
//               </div>
//             )}
//           </section>
//         )}
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   auth: state.auth,
//   bookings: state.bookings.bookings,
//   payments: state.payments,
//   errors: state.errors
// });

// export default connect(mapStateToProps, {
//   fetchUserBookings,
//   fetchPendingPayments,
//   confirmPayment,
//   declinePayment
// })(BookingManage);

import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BookingCard, PaymentCard } from "./BookingCard";

import * as actions from "../../actions";

class BookingManage extends React.Component {
  state = {
    pendingPayments: []
  };

  componentDidMount() {
    this.props.dispatch(actions.fetchUserBookings());
    this.getPendingPayments();
  }

  getPendingPayments() {
    actions
      .getPendingPayments()
      .then(pendingPayments => this.setState({ pendingPayments }))
      .catch(err => console.error(err));
  }

  acceptPayment(payment) {
    actions
      .acceptPayment(payment)
      .then(status => {
        this.getPendingPayments();
      })
      .catch(err => console.error(err));
  }

  declinePayment(payment) {
    actions
      .declinePayment(payment)
      .then(status => {
        this.getPendingPayments();
      })
      .catch(err => console.error(err));
  }

  renderBookings(bookings) {
    return bookings.map((booking, index) => (
      <BookingCard booking={booking} key={index} />
    ));
  }

  renderPayments(payments) {
    return payments.map((payment, index) => (
      <PaymentCard
        booking={payment.booking}
        payment={payment}
        paymentBtns={this.renderPaymentButtons}
        key={index}
      />
    ));
  }

  renderPaymentButtons = payment => {
    return (
      <div>
        <button
          onClick={() => this.acceptPayment(payment)}
          className="btn btn-success"
        >
          Accept
        </button>{" "}
        <button
          onClick={() => this.declinePayment(payment)}
          className="btn btn-danger"
        >
          Decline
        </button>
      </div>
    );
  };

  render() {
    const { bookings, isFetching } = this.props;
    const { pendingPayments } = this.state;
    const { isAuthenticated } = this.props.auth;

    return (
      <React.Fragment>
        {isAuthenticated && (
          <section id="userBookings">
            <Link to="/" style={{ color: "#008489" }}>
              {" "}
              <i
                style={{ color: "#008489" }}
                class="fas fa-arrow-left"
              ></i>{" "}
            </Link>
            <h1 className="page-title">My Bookings</h1>
            <div className="row">{this.renderBookings(bookings)}</div>
            {!isFetching && bookings.length === 0 && (
              <div className="alert alert-warning">
                You have no bookings yet. Go to rentals section and book your
                place today.
                <Link
                  style={{ marginLeft: "10px" }}
                  className="btn "
                  to="/rentals"
                >
                  Available Rental
                </Link>
              </div>
            )}
          </section>
        )}
        {isAuthenticated && (
          <section id="pendingBookings">
            <h1 className="page-title">My Pending Bookings</h1>
            <div className="row">{this.renderPayments(pendingPayments)}</div>
            {!isFetching && pendingPayments.length === 0 && (
              <div className="alert alert-warning">
                You have no pending bookings currently...
              </div>
            )}
          </section>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    bookings: state.bookings.bookings,
    auth: state.auth
  };
}

export default connect(mapStateToProps)(BookingManage);
