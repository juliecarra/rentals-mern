import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { StripeProvider } from "react-stripe-elements";

import "./App.css";

import RentalList from "./components/Rental/RentalList";
import RentalDetail from "./components/Rental/RentalDetail";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import RentalSearch from "./components/Rental/RentalSearch";
import RentalCreate from "./components/Rental/RentalCreate";
import RentalManage from "./components/Rental/RentalManage";
import BookingManage from "./components/Booking/BookingManage";
import Explore from "./components/Explore/Explore";
import Footer from "./components/Footer/Footer";

const App = withRouter(({ location }) => {
  return (
    <StripeProvider
      apiKey="pk_test_5Rm43jFTyejDme7DVCGe3ysg00yqiEg949
    "
    >
      <div className="App">
        {location.pathname === "/rentals" && <Navbar />}
        <br />

        {location.pathname === "/rentals" && <Explore />}
        <br />
        <div className="container">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/rentals" />} />
            <Route exact path="/rentals" component={RentalList} />
            <Route exact path="/rentals/create" component={RentalCreate} />
            <Route exact path="/rentals/manage" component={RentalManage} />
            <Route exact path="/bookings/manage" component={BookingManage} />

            <Route exact path="/rentals/:id" component={RentalDetail} />
            <Route exact path="/rentals/:city/homes" component={RentalSearch} />
            <Route exact path="/signup" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>

          {location.pathname === "/rentals" && <Footer />}
        </div>
      </div>
    </StripeProvider>
  );
});

export default App;
