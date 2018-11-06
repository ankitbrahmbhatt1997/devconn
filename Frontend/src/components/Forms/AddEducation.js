import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import InputComponent from "../partials/InputComponent";
import TextAreaInputComponent from "../partials/TextAreaInputComponent";
import { addEducation } from "../../actions/profileActions";

class AddEducation extends Component {
  state = {
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    disabled: false,
    description: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      let { errors } = nextProps;

      this.setState(() => ({
        errors
      }));
    }
  }

  OnCurrentChange = e => {
    this.setState(prevState => {
      return {
        current: !prevState.current,
        disabled: !prevState.disabled
      };
    });
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

  //handler for submitting the form

  OnSubmit = e => {
    e.preventDefault();
    const educationData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addEducation(educationData, this.props.history);
  };

  render() {
    let { errors } = this.state;

    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.OnSubmit}>
                <InputComponent
                  type="text"
                  placeholder="* School Or Bootcamp"
                  name="school"
                  value={this.state.school}
                  OnChange={this.OnChange}
                  error={errors.school}
                />

                <InputComponent
                  type="text"
                  placeholder="* Degree Or Certificate"
                  name="degree"
                  value={this.state.degree}
                  OnChange={this.OnChange}
                  error={errors.degree}
                />
                <InputComponent
                  type="text"
                  placeholder="* Your Speciality"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  OnChange={this.OnChange}
                  error={errors.fieldofstudy}
                />

                <h6>From Date</h6>

                <InputComponent
                  type="date"
                  name="from"
                  value={this.state.from}
                  OnChange={this.OnChange}
                  error={errors.from}
                />

                <h6>To Date</h6>
                <InputComponent
                  type="date"
                  name="to"
                  value={this.state.to}
                  OnChange={this.OnChange}
                  disabled={this.state.disabled ? "disabled" : ""}
                  error={errors.to}
                />
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    value={this.state.current}
                    onChange={this.OnCurrentChange}
                    id="current"
                  />
                  <label className="form-check-label" htmlFor="current">
                    Current Job
                  </label>
                </div>
                <TextAreaInputComponent
                  placeholder="Program Description"
                  name="description"
                  value={this.state.description}
                  OnChange={this.OnChange}
                  error={errors.description}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile.userProfile,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
