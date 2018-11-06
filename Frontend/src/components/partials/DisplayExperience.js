import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profileActions";

class DisplayExperience extends Component {
  onDeleteClick = id => {
    this.props.deleteExperience(id);
  };
  render() {
    let ExperienceCredentials;

    if (this.props.experience.length > 0) {
      const experience = this.props.experience.map(edu => (
        <tr key={edu._id}>
          <td>{edu.title}</td>
          <td>{edu.company}</td>
          <td>
            <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
            {edu.to === null ? (
              " Now"
            ) : (
              <Moment format="YYYY/MM/DD">{edu.to}</Moment>
            )}
          </td>
          <td>
            <button onClick={this.onDeleteClick} className="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
      ));

      ExperienceCredentials = (
        <div>
          <h4 className="mb-4">experience Credentials</h4>
          <table className="table">
            <thead>
              <tr>
                <th>title</th>
                <th>company</th>
                <th>location</th>
                <th />
              </tr>
              {experience}
            </thead>
          </table>
        </div>
      );
    } else {
      ExperienceCredentials = (
        <div className="mb-5 mt-5">
          <h2>Please Add experience Credentials</h2>
        </div>
      );
    }

    return <div>{ExperienceCredentials}</div>;
  }
}

export default connect(
  null,
  { deleteExperience }
)(DisplayExperience);
