import React, { Component } from "react";
import { fetchRentalsById } from "../../actions";
import { connect } from "react-redux";
import Spinner from "../Spinner/Spinner";
import RentalInfo from "./RentalInfo";
import RentalMap from "./RentalMap";
import Booking from "../Booking/Booking";
import { Link } from "react-router-dom";

class RentalDetail extends Component {
  componentDidMount() {
    const rentalId = this.props.match.params.id;
    this.props.fetchRentalsById(rentalId);
  }

  render() {
    const { rental } = this.props;
    let content;
    if (rental === null) {
      content = <Spinner />;
    } else {
      content = (
        <section className="RentalDetail">
          <div>
            <Link to="/" style={{ color: "#008489" }}>
              {" "}
              <i
                style={{ color: "#008489" }}
                class="fas fa-arrow-left"
              ></i>{" "}
              {/* Back */}
            </Link>
          </div>
          <br />
          <h1 className="RentalDetail__title-category">
            {rental.title}/{rental.category}
          </h1>
          <p className="RentalDetail__city-country">
            <i className="fas fa-map-marker-alt"></i> {rental.city},
            {rental.country}
          </p>
          <div className="upper-section">
            <div className="row">
              <div className="col-md-6">
                <img src={rental.image} alt="" />
              </div>
              <div className="col-md-6">
                <RentalMap location={`${rental.city},${rental.country}`} />
              </div>
            </div>
          </div>

          <div className="lower-section">
            <div className="row">
              <div className="col-md-8">
                <RentalInfo rental={rental} />
              </div>
              <div className="col-md-4">
                <Booking rental={rental} />
              </div>
            </div>
          </div>
        </section>
      );
    }
    return <div>{content}</div>;
  }
}

const mapStateToProps = state => {
  return {
    rental: state.rental.rental
  };
};

export default connect(mapStateToProps, { fetchRentalsById })(RentalDetail);
