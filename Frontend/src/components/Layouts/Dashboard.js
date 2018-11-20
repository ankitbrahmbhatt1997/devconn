import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserProfile } from "../../actions/profileActions";
import isEmpty from "../../utils/is-empty";
import { Link } from "react-router-dom";
import DisplayDashboardUtilButtons from "../partials/DisplayDashboardUtilButtons";
import DisplayEducation from "../partials/DisplayEducation";
import DisplayExperience from "../partials/DisplayExperience";
import { deleteAccount } from "../../actions/profileActions";
import Spinner from "../partials/Spinner";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUserProfile();
  }

  render() {
    let { user } = this.props.auth;
    let { loaderRequired, userProfile } = this.props.profile;
    let DashboardContent;
    if (userProfile === null || loaderRequired) {
      DashboardContent = <Spinner />;
    } else {
      if (isEmpty(userProfile)) {
        DashboardContent = (
          <div>
            <h1>Welcome {user.name}</h1>
            <h3 className="lead text-muted">Please create a Profile</h3>
            <Link className="btn btn-lg btn-info" to="/createProfile">
              Create
            </Link>
          </div>
        );
      } else {
        DashboardContent = (
          <div className="dashboard">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="display-4">Dashboard</h1>
                  <p className="lead text-muted">
                    Welcome{" "}
                    <Link to={`/developerProfile/:${userProfile.handle}`}>
                      {user.name}
                    </Link>
                  </p>
                  <DisplayDashboardUtilButtons />
                  <DisplayEducation education={userProfile.education} />
                  <DisplayExperience experience={userProfile.experience} />
                </div>
              </div>
              <div className="row">
                <div style={{ marginBottom: "60px" }}>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      this.props.deleteAccount();
                    }}
                  >
                    Delete My Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    return <div className="container">{DashboardContent}</div>;
  }
}

const mapStateToProps = state => ({ profile: state.profile, auth: state.auth });

export default connect(
  mapStateToProps,
  { getUserProfile, deleteAccount }
)(Dashboard);
