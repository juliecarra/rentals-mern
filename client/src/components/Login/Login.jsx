import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      toast.error("wrong credentials");
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.props.errors;
    console.log(errors);
    return (
      <div className="Login">
        <ToastContainer />
        <div className="Login__form">
          <div className="row">
            <div className="col-md-5">
              <br />
              <h1 className="Login__title">Log in</h1>
              <br />
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Email address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  required
                />
                <input
                  type="submit"
                  className="btn btn-submit btn-block mt-4"
                  value="Login"
                  errors={errors}
                />
                <hr />

                <p style={{ color: "rgb(72, 72, 72)", fontWeight: "400" }}>
                  Don’t have an account?
                  <a
                    href="/signup"
                    style={{ color: "#008489", fontWeight: 600 }}
                  >
                    {" "}
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
