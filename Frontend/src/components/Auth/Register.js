import React, { Component } from "react";
import classnames from "classnames";
import axios from "axios";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authAction";
import { withRouter } from "react-router-dom";
import InputComponent from "../partials/InputComponent";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  OnNameChange = e => {
    let name = e.target.value;
    this.setState(() => {
      return {
        name
      };
    });
  };

  OnEmailChange = e => {
    let email = e.target.value;
    this.setState(() => {
      return {
        email
      };
    });
  };

  OnPasswordChange = e => {
    let password = e.target.value;
    this.setState(() => {
      return {
        password
      };
    });
  };

  OnPassword2Change = e => {
    let password2 = e.target.value;
    this.setState(() => {
      return {
        password2
      };
    });
  };

  OnSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
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
  }

  render() {
    let { errors } = this.state;

    return (
      <div className="container">
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">
                  Create your DevConnector account
                </p>
                <form onSubmit={this.OnSubmit}>
                  <InputComponent
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={this.state.name}
                    OnChange={this.OnNameChange}
                    error={errors.name}
                  />
                  <InputComponent
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={this.state.email}
                    OnChange={this.OnEmailChange}
                    error={errors.email}
                  />
                  <InputComponent
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    OnChange={this.OnPasswordChange}
                    error={errors.password}
                  />
                  <InputComponent
                    name="password2"
                    type="password"
                    placeholder="ReEnter password"
                    value={this.state.password2}
                    OnChange={this.OnPassword2Change}
                    error={errors.password2}
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
  { registerUser }
)(withRouter(Register));
