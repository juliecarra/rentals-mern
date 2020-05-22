import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Search extends Component {
  constructor(props) {
    super(props);

    this.searchInput = React.createRef();
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.handleSearch();
    }
  }

  handleSearch = () => {
    const { history } = this.props;
    const city = this.searchInput.current.value;

    city ? history.push(`/rentals/${city}/homes`) : history.push("/rentals");
  };

  render() {
    return (
      <div class="Search">
        <h1 class="Search__heading">Book unique places to stay.</h1>
        <form class="Search__form">
          <label class="Search__label">WHERE</label>
          <br />
          <input
            class="input"
            placeholder="City"
            onKeyPress={(e) => {
              this.handleKeyPress(e);
            }}
            ref={this.searchInput}
            type="search"
          />

          <div class="Search__datapicker">
            <label class="Search__label checkin">CHECK-IN</label>
            <label class="Search__label">CHECK-OUT</label>
          </div>

          <div class="Search__datapicker--input">
            <input type="date" class="datepicker" placeholder="mm/dd/yyyy" />

            <input type="date" class="datepicker" placeholder="mm/dd/yyyy" />
          </div>

          <br />
          <label class="Search__label">GUESTS</label>
          <br />
          <input
            type="number"
            min="0"
            max="100"
            class="input"
            placeholder="Guests"
          />
        </form>

        <div class="Search__button--container">
          <button
            class="Search__button"
            type="submit"
            value="Search"
            onClick={this.handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Search);
