import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      toast.error("wrong credentials");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="Signup">
        <ToastContainer />
        <div className="Signup__form">
          <div className="row">
            <div className="col-md-5">
              <br />
              <h1 className="Signup__title">Sign up</h1>
              <br />
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  className="form-control"
                  placeholder="Username"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                  error={errors.username}
                />
                <TextFieldGroup
                  className="form-control"
                  placeholder="Email address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  className="form-control"
                  placeholder="Password Confirmation"
                  name="passwordConfirmation"
                  type="password"
                  value={this.state.passwordConfirmation}
                  onChange={this.onChange}
                  error={errors.passwordConfirmation}
                />

                <input
                  type="submit"
                  className="btn  btn-submit btn-block mt-4"
                  value="Sign up"
                />

                <hr />
                <p style={{ color: "rgb(72, 72, 72)", fontWeight: "400" }}>
                  Already have an account?{" "}
                  <a
                    href="/login"
                    style={{ color: "#008489", fontWeight: 600 }}
                  >
                    Log in
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
