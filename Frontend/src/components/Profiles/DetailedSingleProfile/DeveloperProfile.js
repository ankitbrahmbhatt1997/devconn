import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfileByHandle } from "../../../actions/profileActions";
import Header from "./ProfilePartials/Header";
import About from "./ProfilePartials/About";
import Credentials from "./ProfilePartials/Credentials";
import isEmpty from "../../../utils/is-empty";
import Spinner from "../../partials/Spinner";
import ImageModal from "../../partials/ImageModal";
import Dropzone from "react-dropzone";
import { changeImage } from "../../../actions/authAction";
import { follow, unfollow } from "../../../actions/profileActions";

class DeveloperProfile extends Component {
  state = {
    ModalOpen: false,
    files: []
  };
  componentDidMount() {
    const { handle } = this.props.match.params;
    // handle = handle.slice(1);

    this.props.getProfileByHandle(handle.slice(1));
  }

  onCloseModal = () => {
    this.setState(() => ({
      ModalOpen: false,
      files: []
    }));
  };

  onOpenModal = () => {
    this.setState(() => ({
      ModalOpen: true
    }));
  };

  handleOnDrop = (acceptedFiles, rejectedFiles) => {
    console.log(acceptedFiles[0]);
    this.setState(() => ({
      files: acceptedFiles
    }));
  };

  handleImageSubmit = () => {
    this.props.changeImage(this.state.files[0]);
    this.onCloseModal();
  };

  handleFollow = () => {
    const data = {
      targetId: this.props.profile.userProfile.user._id
    };
    this.props.follow(data);
  };

  handleUnfollow = () => {
    const data = {
      targetId: this.props.profile.userProfile.user._id
    };
    this.props.unfollow(data);
  };

  render() {
    const ModalContent = (
      <div className="card">
        <div className="card-body">
          <Dropzone onDrop={this.handleOnDrop} className="dropzone">
            <p>
              Try dropping some files here, or click to select files to upload.
            </p>
          </Dropzone>
        </div>
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            className="btn btn-primary"
            disabled={this.state.files.length === 0 ? true : false}
            onClick={this.handleImageSubmit}
          >
            save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.onCloseModal}
          >
            Cancel
          </button>
        </div>
      </div>
    );

    let { loaderRequired, userProfile } = this.props.profile;
    let { ModalOpen } = this.state;
    let { user } = this.props.auth;

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
            <Header
              profile={userProfile}
              authenticated={userProfile.user._id === user.id}
              loggedInUser={user.id}
              onOpenModal={this.onOpenModal}
              handleFollow={this.handleFollow}
              handleUnfollow={this.handleUnfollow}
            />
            <About profile={userProfile} />
            <Credentials profile={userProfile} />
            <ImageModal
              open={ModalOpen}
              content={ModalContent}
              onClose={this.onCloseModal}
            />
          </div>
        );
      }
    }
    return <div className="container">{ProfileContent}</div>;
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { getProfileByHandle, changeImage, follow, unfollow }
)(DeveloperProfile);

//<About profile={userProfile} />
