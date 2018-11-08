import React from "react";
import { Link } from "react-router-dom";
import htmlParser from "react-html-parser";
import { connect } from "react-redux";
import { addLike, addDislike } from "../../../actions/postActions"

class SinglePostHeader extends React.Component {


  OnLikeClick = e => {
    this.props.addLike(this.props.post._id);
  }

  OnDislikeClick = e => {
    this.props.addDislike(this.props.post._id);
  }

  render() {
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to="/userProfile">
              <img
                className="rounded-circle d-none d-md-block"
                src={this.props.post.avatar}
                alt="User Image"
              />
            </Link>
            <br />
            <p className="text-center">{this.props.post.name}</p>
          </div>
          <div className="col-md-10">
            <h5>{this.props.post.subject}</h5>
            <div className="lead">{htmlParser(this.props.post.text)}</div>
            <button type="button" className="btn btn-light mr-1" onClick={this.OnLikeClick}>
              <i className="text-info fas fa-thumbs-up" ></i>
              <span className="badge badge-light">{this.props.post.likes.length}</span>
            </button>
            <button type="button" className="btn btn-light mr-1" onClick={this.OnDislikeClick}>
              <i className="text-secondary fas fa-thumbs-down"></i>
              <span className="badge badge-light">{this.props.post.dislikes.length}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}





export default connect(null, { addLike, addDislike })(SinglePostHeader)