import React, { Component } from "react";
import PropTypes from "prop-types";

import { fetchRentals } from "../../actions";
import { connect } from "react-redux";

import RentalItem from "./RentalItem";

class RentalList extends Component {
  componentDidMount() {
    this.props.fetchRentals();
  }

  render() {
    const { rentals } = this.props;

    console.log(this.props);
    return (
      <div>
        <div id="#rentals" className="container__title">
          Places to stay around the world
        </div>
        <br />
        <div className="row">
          {rentals.map((rental, i) => (
            <div className="col-sm" key={i}>
              <RentalItem rental={rental} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

RentalList.propTypes = {
  fetchRentals: PropTypes.func.isRequired,
  rentals: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    rentals: state.rentals.rentals
  };
};

export default connect(mapStateToProps, { fetchRentals })(RentalList);
