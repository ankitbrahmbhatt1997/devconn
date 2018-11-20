import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { searchUserInArray } from "../../../../utils/usefulCustomMethods";

export default function Header(props) {
  const { followers } = props.profile.user;
  const { loggedInUser } = props;
  let followContent;
  if (searchUserInArray(followers, loggedInUser)) {
    followContent = (
      <p>
        <a className="btn-unfollow" onClick={props.handleUnfollow}>
          Following
        </a>
      </p>
    );
  } else {
    followContent = (
      <p>
        <a className="btn btn-test" onClick={props.handleFollow}>
          Follow
        </a>
      </p>
    );
  }
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
                {props.authenticated ? (
                  <a className="text-white p-2" onClick={props.onOpenModal}>
                    <i className="far fa-edit fa-2x" />
                  </a>
                ) : (
                  ""
                )}
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
              {!props.authenticated && followContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
