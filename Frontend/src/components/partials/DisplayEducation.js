import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileActions";

class DisplayEducation extends Component {
  onDeleteClick = id => {
    this.props.deleteEducation(id);
  };
  render() {
    let EducationCredentials;

    if (this.props.education.length > 0) {
      const education = this.props.education.map(edu => (
        <tr key={edu._id}>
          <td>{edu.school}</td>
          <td>{edu.degree}</td>
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

      EducationCredentials = (
        <div>
          <h4 className="mb-4">Education Credentials</h4>
          <table className="table">
            <thead>
              <tr>
                <th>School</th>
                <th>Degree</th>
                <th>Years</th>
                <th />
              </tr>
              {education}
            </thead>
          </table>
        </div>
      );
    } else {
      EducationCredentials = (
        <div className="mb-5 mt-5">
          <h2>Please Add Education Credentials</h2>
        </div>
      );
    }

    return <div>{EducationCredentials}</div>;
  }
}

export default connect(
  null,
  { deleteEducation }
)(DisplayEducation);
