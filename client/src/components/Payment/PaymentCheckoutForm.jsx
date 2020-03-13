import React, { Component } from "react";
import { injectStripe, CardElement } from "react-stripe-elements";

//Style for CardElement
const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: "15px",
        color: "#424770",
        letterSpacing: "0.025em",
        fontFamily: "",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#9e2146"
      }
    }
  };
};

const formStyle = () => {
  return {
    style: {
      height: "100px",
      backgroundColor: "#fbfbfb",
      padding: "5px",
      marginTop: "15px"
    }
  };
};

const buttonStyle = () => {
  return {
    style: {
      marginTop: "15px"
    }
  };
};

const paragraphStyle = () => {
  return {
    style: {
      marginTop: "5px",
      fontSize: "11px",
      color: "#aab7c4"
    }
  };
};

class PaymentCheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: undefined
    };
  }

  handleSubmit = e => {
    const { stripe, setPaymentToken } = this.props;
    e.preventDefault();

    if (stripe) {
      stripe.createToken().then(payload => {
        if (payload.error) {
          setPaymentToken(undefined);
          return this.setState({ error: payload.error.message });
        }

        setPaymentToken(payload.token.id);
      });
    } else {
      console.error("Stripe.js hasn't loaded yet!");
    }
  };

  render() {
    const { error } = this.state;
    return (
      <div className="PaymentCheckoutForm">
        <form onSubmit={this.handleSubmit} {...formStyle()}>
          <CardElement {...createOptions()} />
          <p {...paragraphStyle}>
            (Test with this credit card number: 4242 4242 4242 4242)
          </p>
          <p {...paragraphStyle}>You will not be charged yet</p>
          {error && (
            <div className="alert alert-danger alert-payment">{error}</div>
          )}

          <button className="btn btn-success" {...buttonStyle}>
            Confirm Payment
          </button>
        </form>
      </div>
    );
  }
}

export default injectStripe(PaymentCheckoutForm);
