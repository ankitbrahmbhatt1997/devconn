import React from "react";

export default function Credentials(props) {
  return (
    <div className="row">
      <div className="col-md-6">
        <h3 className="text-center text-info">Experience</h3>
        <ul className="list-group">
          {props.profile.experience.map(singleExp => {
            return (
              <li className="list-group-item" key={singleExp.from}>
                <h4>{singleExp.company}</h4>
                <p>
                  {singleExp.from} - {singleExp.to ? singleExp.to : "current"}
                </p>
                <p>
                  <strong>Position:</strong> {singleExp.title}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {singleExp.description
                    ? singleExp.description
                    : "No description provide"}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="col-md-6">
        <h3 className="text-center text-info">Education</h3>
        <ul className="list-group">
          {props.profile.education.map(singleEdu => {
            return (
              <li className="list-group-item" key={singleEdu.from}>
                <h4>{singleEdu.school}</h4>
                <p>
                  {singleEdu.from} - {singleEdu.to ? singleEdu.to : "current"}
                </p>
                <p>
                  <strong>degree:</strong> {singleEdu.degree}
                </p>
                <p>
                  <strong>Field Of Study: </strong>
                  {singleEdu.fieldofstudy}
                </p>

                <p>
                  <strong>Description:</strong>{" "}
                  {singleEdu.description
                    ? singleEdu.description
                    : "No description provide"}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
