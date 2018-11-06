import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfileByHandle } from "../../../actions/profileActions";
import Header from "./ProfilePartials/Header";
import About from "./ProfilePartials/About";
import Credentials from "./ProfilePartials/Credentials";
import isEmpty from "../../../utils/is-empty";
import Spinner from "../../partials/Spinner";

class DeveloperProfile extends Component {
  componentDidMount() {
    const { handle } = this.props.match.params;
    // handle = handle.slice(1);

    this.props.getProfileByHandle(handle.slice(1));
  }
  render() {
    let { loaderRequired, userProfile } = this.props.profile;

    let ProfileContent;

    if (loaderRequired) {
      ProfileContent = (
        <div>
          <Spinner />
        </div>
      );
    } else {
      if (isEmpty(userProfile)) {
        ProfileContent = <h2>This User Has not Created any profile yet</h2>;
      } else {
        ProfileContent = (
          <div>
            <Header profile={userProfile} />
            <About profile={userProfile} />
            <Credentials profile={userProfile} />
          </div>
        );
      }
    }
    return <div className="container">{ProfileContent}</div>;
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(DeveloperProfile);

//<About profile={userProfile} />
