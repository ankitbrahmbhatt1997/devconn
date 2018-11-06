import React from "react";
import { Link } from "react-router-dom";

export default function SingleDeveloperDisplay(props) {
  let Skills = (
    <ul className="list-group">
      {props.profile.skills.slice(0, 4).map(singleSkill => {
        return (
          <li className="list-group-item" key={singleSkill}>
            <i className="fa fa-check pr-1" />
            {singleSkill}
          </li>
        );
      })}{" "}
    </ul>
  );
  return (
    <div>
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img
              className="rounded-circle"
              src={props.profile.user.avatar}
              alt="image"
            />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{props.profile.user.name}</h3>
            <p>
              {props.profile.status ? props.profile.status : null} at{" "}
              {props.profile.company ? props.profile.company : null}
            </p>
            <p>{props.profile.location ? props.profile.location : null}</p>
            <Link
              to={"developerProfile/:" + props.profile.handle}
              className="btn btn-info"
            >
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-none d-lg-block">
            <h4>Skill Set</h4>
            {Skills}
          </div>
        </div>
      </div>
    </div>
  );
}
