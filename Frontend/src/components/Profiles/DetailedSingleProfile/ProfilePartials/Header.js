import React from "react";

export default function Header(props) {
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={props.profile.user.avatar}
                  alt="User"
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 ">{props.profile.user.name}</h1>
              <p className="lead ">
                {props.profile.status ? props.profile.status : null} at{" "}
                {props.profile.company ? props.profile.company : null}
              </p>
              <p>{props.profile.location ? props.profile.location : null}</p>
              <p>
                <a
                  className="text-white p-2"
                  href={
                    props.profile.social ? props.profile.social.youtube : "#"
                  }
                >
                  <i className="fas fa-globe fa-2x" />
                </a>
                <a
                  className="text-white p-2"
                  href={
                    props.profile.social ? props.profile.social.twitter : "#"
                  }
                >
                  <i className="fab fa-twitter fa-2x" />
                </a>
                <a
                  className="text-white p-2"
                  href={
                    props.profile.social ? props.profile.social.facebook : "#"
                  }
                >
                  <i className="fab fa-facebook fa-2x" />
                </a>
                <a
                  className="text-white p-2"
                  href={
                    props.profile.social ? props.profile.social.linkedin : "#"
                  }
                >
                  <i className="fab fa-linkedin fa-2x" />
                </a>
                <a
                  className="text-white p-2"
                  href={
                    props.profile.social ? props.profile.social.instagram : "#"
                  }
                >
                  <i className="fab fa-instagram fa-2x" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
