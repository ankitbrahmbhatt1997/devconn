import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import InputComponent from "../partials/InputComponent";
import TextAreaInputComponent from "../partials/TextAreaInputComponent";
import { addExperience } from "../../actions/profileActions";

class AddExperience extends Component {
  state = {
    title: "",
    company: "",
    location: "",
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
    const experienceData = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addExperience(experienceData, this.props.history);
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
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">Add any Job or experience</p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.OnSubmit}>
                <InputComponent
                  type="text"
                  placeholder="* title Or Bootcamp"
                  name="title"
                  value={this.state.title}
                  OnChange={this.OnChange}
                  error={errors.title}
                />

                <InputComponent
                  type="text"
                  placeholder="* company Or Certificate"
                  name="company"
                  value={this.state.company}
                  OnChange={this.OnChange}
                  error={errors.company}
                />
                <InputComponent
                  type="text"
                  placeholder="* company Or Certificate"
                  name="location"
                  value={this.state.location}
                  OnChange={this.OnChange}
                  error={errors.location}
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
  { addExperience }
)(withRouter(AddExperience));
