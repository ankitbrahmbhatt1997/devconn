import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authAction";
import Sidebar from "./Sidebar";

class Navbar extends Component {
  OnLogoutClick = e => {
    e.preventDefault();
    this.props.dispatch(logoutUser(this.props.history));
  };

  render() {
    let { isAuthenticated } = this.props.auth;
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/register">
            Sign Up
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
      </ul>
    );

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/posts">
            Post Feed
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/createpost">
            Ask a Question
          </NavLink>
        </li>
        <li className="nav-item">
          <a href="#" onClick={this.OnLogoutClick} className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    );

    return (
      <header>
        <div className="row">
          <div className="col-md-12">
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
              <div className="container">
                <NavLink className="navbar-brand" to="/">
                  DevtoDev
                </NavLink>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#mobile-nav"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="mobile-nav">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/profiles">
                        Developers
                      </NavLink>
                    </li>
                  </ul>
                  {isAuthenticated ? authLinks : guestLinks}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(withRouter(Navbar));
