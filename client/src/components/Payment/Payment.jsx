import React, { Component } from "react";
import { Elements } from "react-stripe-elements";

import PaymentCheckoutForm from "./PaymentCheckoutForm";

class Payment extends Component {
  render() {
    return (
      <div className="payment">
        <Elements>
          <PaymentCheckoutForm {...this.props} />
        </Elements>
      </div>
    );
  }
}

export default Payment;
