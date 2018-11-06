import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authAction";
import InputComponent from "../partials/InputComponent";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  OnChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

  OnSubmit = e => {
    e.preventDefault();
    const User = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(User);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState(() => {
        return {
          errors: nextProps.errors
        };
      });
    }

    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    let { errors } = this.state;
    return (
      <div className="container">
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">
                  Sign in to your DevtoDev account
                </p>
                <form onSubmit={this.OnSubmit}>
                  <InputComponent
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={this.state.email}
                    OnChange={this.OnChange}
                    error={errors.email}
                  />

                  <InputComponent
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    OnChange={this.OnChange}
                    error={errors.password}
                  />

                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
