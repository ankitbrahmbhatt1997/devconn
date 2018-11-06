import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { getPostById } from "../../actions/postActions";
import SinglePostHeader from "./Post_partials/SinglePostHeader";
import SinglePostEditor from "./Post_partials/SinglePostEditor";
import Spinner from "../partials/Spinner";

class SinglePost extends Component {
  componentDidMount() {
    let { id } = this.props.match.params;
    this.props.getPostById(id);
  }

  render() {
    let { singlePost, loadingRequired } = this.props.post;
    let SinglePostContent;
    if (loadingRequired || singlePost === null) {
      SinglePostContent = <Spinner />;
    } else {
      SinglePostContent = (
        <div className="post">
          <div className="row">
            <div className="col-md-12">
              <SinglePostHeader post={singlePost} />
              <SinglePostEditor post={singlePost} />
            </div>
          </div>
        </div>
      );
    }
    return <div className="container">{SinglePostContent}</div>;
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPostById }
)(SinglePost);
