import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { fetchUserRentals } from "../../actions/";
import { connect } from "react-redux";

import RentalManageCard from "./RentalManageCard";

class RentalManage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRentals: [],
      errors: [],
      isFetching: false
    };
  }

  componentDidMount() {
    this.setState({ isFetching: true });
    this.props.fetchUserRentals();
    this.setState({ isFetching: false });
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { isFetching } = this.state;
    const { rentals } = this.props;

    return (
      <div>
        {isAuthenticated && (
          <section id="userRentals">
            <ToastContainer />
            <Link to="/" style={{ color: "#008489" }}>
              <i style={{ color: "#008489" }} class="fas fa-arrow-left"></i>
            </Link>
            <h1 className="page-title">My Rentals</h1>
            <br />
            <div className="row">
              {rentals.map((rental, index) => (
                <RentalManageCard
                  key={index}
                  rental={rental}
                  rentalIndex={index}
                />
              ))}
            </div>

            {!isFetching && rentals.length === 0 && (
              <div className="alert alert-warning">
                You dont have any rentals created yet. If you want to advertised
                your property please follow this link.
                <Link
                  style={{ marginLeft: "10px" }}
                  className="btn"
                  to="/rentals/create"
                >
                  Register your Rental
                </Link>
              </div>
            )}
          </section>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  rentals: state.rentals.rentals
});

export default connect(mapStateToProps, {
  fetchUserRentals
})(RentalManage);
