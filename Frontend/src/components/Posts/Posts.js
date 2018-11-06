import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../partials/Spinner";
import { getAllPosts } from "../../actions/postActions";
import PostListItem from "./Post_partials/PostListItem";

class Posts extends Component {
  componentDidMount() {
    this.props.getAllPosts();
  }

  render() {
    let PostsContent;
    let { posts, loadingRequired } = this.props.post;
    if (loadingRequired || posts === null) {
      PostsContent = <Spinner />;
    } else {
      if (posts.length === 0) {
        PostsContent = <h1> No Posts Found </h1>;
      } else {
        PostsContent = posts.map(singlePost => {
          return <PostListItem key={singlePost._id} post={singlePost} />;
        });
      }
    }
    return <div className="container"> {PostsContent} </div>;
  }
}

const mapStateToProps = state => ({ post: state.post });

export default connect(
  mapStateToProps,
  {
    getAllPosts
  }
)(Posts);
