import React, { Component } from "react";
import PropTypes from "prop-types";

import { fetchRentals } from "../../actions";
import { connect } from "react-redux";

import RentalItem from "./RentalItem";

class RentalSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchedCity: ""
    };
  }

  componentDidMount() {
    this.searchRentalsByCity();
  }

  searchRentalsByCity = () => {
    const searchedCity = this.props.match.params.city;
    this.setState({ searchedCity });
    this.props.fetchRentals(searchedCity);
  };

  //   handleTitle() {
  //     const { errors } = this.props.errors;
  //     const { searchedCity } = this.state;
  //     let title = "";

  //     if (errors.length > 0) {
  //       title = errors[0].detail;
  //     } else {
  //       title = `Places to stay in ${searchedCity}`;
  //     }
  //   }

  render() {
    const { rentals, errors } = this.props;
    console.log(this.props);
    const { searchedCity } = this.state;
    return (
      <div>
        <div className="container__title">Places to stay in {searchedCity}</div>
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

RentalSearch.propTypes = {
  fetchRentals: PropTypes.func.isRequired,
  rentals: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    rentals: state.rentals.rentals,
    errors: state.errors.errors
  };
};

export default connect(mapStateToProps, { fetchRentals })(RentalSearch);
