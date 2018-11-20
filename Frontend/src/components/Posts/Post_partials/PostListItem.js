import React from "react";
import { Link } from "react-router-dom";

export default function PostListItem(props) {
  return (
    <div className="card mt-3 mb-3 p-3">
      <div className="media">
        <img
          className="m-3 rounded-circle"
          src={props.post.avatar}
          alt="User Image"
          style={{ height: "4rem", width: "4rem" }}
        />
        <div className="media-body mt-3">
          <h4>
            <Link to={"/singlepost/" + props.post._id}>
              {props.post.subject}
            </Link>
          </h4>
          <div>
            <button type="button" className="btn btn-light m-1">
              <i className="text-info fas fa-thumbs-up"></i>
              <span className="badge badge-light">{props.post.likes.length}</span>
              </button>
              <button type="button" className="btn btn-light m-1">
              <i className="text-secondary fas fa-thumbs-down"></i>
              <span className="badge badge-light">{props.post.dislikes.length}</span>
              </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
              
 
