import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Search from "../Search/Search";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.searchInput = React.createRef();
    this.handleSearch = this.handleSearch.bind(this);
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
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
    const { isAuthenticated, user } = this.props.auth;

    console.log(this.props.auth.user.bookings);
    const authLinks = (
      <div className="Navbar">
        <nav className="navbar">
          <Link className="navbar-brand" to="/">
            <i class="fas fa-home"></i>
          </Link>
          <ul className="nav justify-content-end">
            <div className="nav-item dropdown">
              <a
                className="nav-link nav-item dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Profile
              </a>

              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <Link className="dropdown-item" to="/rentals/create">
                  Create Rental
                </Link>
                <Link className="dropdown-item" to="/rentals/manage">
                  Manage Rentals
                </Link>
                <Link className="dropdown-item" to="/bookings/manage">
                  Manage Bookings
                </Link>
              </div>
            </div>
            <li className="nav-item">
              <Link
                to=""
                onClick={this.onLogoutClick.bind(this)}
                className="nav-link"
              >
                Log out
              </Link>
            </li>
          </ul>
        </nav>
        <div class="cover">
          {/* <h1 className="title">Book unique places to stay.</h1> */}
          {/* <form class="flex-form">
            <input
              onKeyPress={e => {
                this.handleKeyPress(e);
              }}
              ref={this.searchInput}
              type="search"
              placeholder="Where do you want to go?"
            />
            <input type="submit" value="Search" onClick={this.handleSearch} />
          </form> */}
          <div className="Search__component">
            <Search />
          </div>
        </div>
      </div>
    );
    const guestLinks = (
      <div class="Navbar">
        <nav className="navbar">
          <Link className="navbar-brand" to="/">
            <i class="fas fa-home"></i>
          </Link>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <Link className="nav-link active" to="/signup">
                Sign up
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Log in
              </Link>
            </li>
          </ul>
        </nav>

        <div class="cover">
          {/* <h1 className="title">Book unique places to stay.</h1> */}
          {/* <form class="flex-form">
            <input
              onKeyPress={e => {
                this.handleKeyPress(e);
              }}
              ref={this.searchInput}
              type="search"
              placeholder="Where do you want to go?"
            />
            <input onClick={this.handleSearch} type="submit" value="Search" />
          </form> */}
          <div className="Search__component">
            <Search />
          </div>
        </div>
      </div>
    );
    return <div>{isAuthenticated === true ? authLinks : guestLinks}</div>;
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(connect(mapStateToProps, { logoutUser })(Navbar));
