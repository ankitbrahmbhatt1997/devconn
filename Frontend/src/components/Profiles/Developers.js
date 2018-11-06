import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { getProfiles } from "../../actions/profileActions";
import SingleDeveloperProfile from "./SingleDeveloperDisplay";
import Spinner from "../partials/Spinner";

class Developers extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    let ProfileContent;
    let { loadingRequired, profiles } = this.props.profile;
    if (loadingRequired || profiles === null) {
      ProfileContent = <Spinner />;
    } else {
      if (profiles.length > 0) {
        ProfileContent = profiles.map(singleProfile => {
          return (
            <SingleDeveloperProfile
              profile={singleProfile}
              key={singleProfile._id}
            />
          );
        });
      } else {
        ProfileContent = (
          <div>
            <p className="muted-text">You have reached the end</p>
          </div>
        );
      }
    }
    return (
      <div className="container">
        <div className="profiles">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {ProfileContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  { getProfiles }
)(Developers);
