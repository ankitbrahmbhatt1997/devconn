import React from "react";

export default function About(props) {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-center text-info">{props.profile.user.name}</h3>
          <p className="lead">
            {props.profile.bio ? props.profile.bio : "No bio added by user"}
          </p>
          <hr />
          <h3 className="text-center text-info">Skill Set</h3>
          <div className="row">
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {props.profile.skills.map(singleSkill => {
                return (
                  <div className="p-3" key={singleSkill}>
                    <i className="fa fa-check" /> {singleSkill}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
