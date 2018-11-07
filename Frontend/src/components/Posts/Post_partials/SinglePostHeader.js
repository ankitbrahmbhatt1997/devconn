import React from "react";
import { Link } from "react-router-dom";
import htmlParser from "react-html-parser";

export default function SinglePostHeader(props) {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <Link to="/userProfile">
            <img
              className="rounded-circle d-none d-md-block"
              src={props.post.avatar}
              alt="User Image"
            />
          </Link>
          <br />
          <p className="text-center">{props.post.name}</p>
        </div>
        <div className="col-md-10">
          <h5>{props.post.subject}</h5>
          <div className="lead">{htmlParser(props.post.text)}</div>
          <button type="button" className="btn btn-light mr-1">
            <i className="text-info fas fa-thumbs-up" />
            <span className="badge badge-light" />
          </button>
          <button type="button" className="btn btn-light mr-1">
            <i className="text-secondary fas fa-thumbs-down" />
          </button>
        </div>
      </div>
    </div>
  );
}
