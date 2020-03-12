import React, { Component } from "react";
import { connect } from "react-redux";
import RentalForm from "./RentalForm";
import { Link } from "react-router-dom";

class RentalCreate extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        {isAuthenticated && (
          <section id="newRental">
            <div>
              <Link to="/" style={{ color: "#008489" }}>
                {" "}
                <i
                  style={{ color: "#008489" }}
                  class="fas fa-arrow-left"
                ></i>{" "}
              </Link>
            </div>
            <br />
            <div className="form">
              <div className="row  middle">
                <div className="col-md-5">
                  <h1 className="page-title">Create a rental</h1>
                  <RentalForm />
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(RentalCreate);
