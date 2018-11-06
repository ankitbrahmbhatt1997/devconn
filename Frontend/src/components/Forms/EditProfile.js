import React, { Component } from "react";
import InputComponent from "../partials/InputComponent";
import SelectInputComponent from "../partials/SelectInputComponent";
import SocialInputComponent from "../partials/SocialInputComponent";
import TextAreaInputComponent from "../partials/TextAreaInputComponent";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { editUserProfile, getUserProfile } from "../../actions/profileActions";
import isEmpty from "../../utils/is-empty";
import propTypes from "prop-types";

class EditProfile extends Component {
  state = {
    displaySocialHandles: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    bio: "",
    status: "",
    githubusername: "",
    skills: "",
    facebook: "",
    youtube: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    errors: {}
  };

  // Lifecycle function for changing errors in localstate everytime they changes in redux store

  componentDidMount() {
    this.props.getUserProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (!isEmpty(nextProps.profile)) {
      const profile = nextProps.profile;

      // Bring skills array back to CSV
      const skillsCSV = profile.skills.join(",");

      // If profile field doesnt exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";

      // Set component fields state
      this.setState(() => ({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube
      }));
    }
  }

  //handler function of submitting a form
  OnSubmit = e => {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.editUserProfile(profileData, this.props.history);
  };

  //handler function onChanging the input value everytime
  OnChange = e => {
    let name = e.target.name;
    let value = e.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

  render() {
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];
    const { displaySocialHandles } = this.state;
    let { errors } = this.state;
    let SocialInputs = (
      <div>
        <SocialInputComponent
          name="twitter"
          type="text"
          placeholder="Twitter Profile URL"
          value={this.state.twitter}
          OnChange={this.OnChange}
          error={errors.twitter}
          icon="twitter"
        />

        <SocialInputComponent
          name="facebook"
          type="text"
          placeholder="Facebook Profile URL"
          value={this.state.facebook}
          OnChange={this.OnChange}
          error={errors.facebook}
          icon="facebook"
        />

        <SocialInputComponent
          name="linkedin"
          type="text"
          placeholder="Linkedin Profile URL"
          value={this.state.linkedin}
          OnChange={this.OnChange}
          error={errors.linkedin}
          icon="linkedin"
        />

        <SocialInputComponent
          name="youtube"
          type="text"
          placeholder="youtube Profile URL"
          value={this.state.youtube}
          OnChange={this.OnChange}
          error={errors.youtube}
          icon="youtube"
        />

        <SocialInputComponent
          name="instagram"
          type="text"
          placeholder="instagram Profile URL"
          value={this.state.instagram}
          OnChange={this.OnChange}
          error={errors.instagram}
          icon="instagram"
        />
      </div>
    );

    return (
      //  Create Profile

      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.OnSubmit}>
                <InputComponent
                  name="handle"
                  type="text"
                  placeholder="* Profile handle"
                  value={this.state.handle}
                  OnChange={this.OnChange}
                  error={errors.handle}
                />

                <SelectInputComponent
                  name="status"
                  value={this.state.status}
                  OnChange={this.OnChange}
                  options={options}
                  error={errors.status}
                />

                <InputComponent
                  name="company"
                  type="text"
                  placeholder="Company"
                  value={this.state.company}
                  OnChange={this.OnChange}
                  error={errors.company}
                />
                <InputComponent
                  name="website"
                  type="text"
                  placeholder="Website"
                  value={this.state.website}
                  OnChange={this.OnChange}
                  error={errors.website}
                />
                <InputComponent
                  name="location"
                  type="text"
                  placeholder="Location"
                  value={this.state.location}
                  OnChange={this.OnChange}
                  error={errors.location}
                />
                <InputComponent
                  name="skills"
                  type="text"
                  placeholder="Skills"
                  value={this.state.skills}
                  OnChange={this.OnChange}
                  error={errors.skills}
                />
                <InputComponent
                  name="githubusername"
                  type="text"
                  placeholder="Github Username"
                  value={this.state.githubusername}
                  OnChange={this.OnChange}
                  error={errors.githubusername}
                />

                <TextAreaInputComponent
                  name="bio"
                  placeholder="Bio"
                  value={this.state.bio}
                  OnChange={this.OnChange}
                  error={errors.bio}
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialHandles: !prevState.displaySocialHandles
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {displaySocialHandles && SocialInputs}

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  errors: propTypes.object.isRequired,
  profile: propTypes.object
};

const mapStateToProps = state => {
  return {
    errors: state.errors,
    profile: state.profile.userProfile
  };
};

export default connect(
  mapStateToProps,
  { editUserProfile, getUserProfile }
)(EditProfile);
