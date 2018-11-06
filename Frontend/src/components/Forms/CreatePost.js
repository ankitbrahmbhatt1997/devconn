import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
import { createPost } from "../../actions/postActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import InputComponent from "../partials/InputComponent";

class CreatePost extends Component {
  state = {
    text: "",
    subject: "",
    name: "",
    avatar: "",
    likes: [],
    answers: [],
    preview: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState(() => ({ errors: nextProps.errors }));
    }
  }

  OnEditorChange = (event, editor) => {
    let data = editor.getData();
    this.setState(() => ({
      text: data
    }));
  };

  onSubjectChange = e => {
    let subject = e.target.value;
    this.setState(() => ({
      subject
    }));
  };

  viewPreview = e => {
    this.setState(() => {
      return {
        preview: this.state.text
      };
    });
  };

  OnSubmit = e => {
    let postData = {
      text: this.state.text,
      subject: this.state.subject
    };
    this.props.createPost(postData, this.props.history);
  };

  render() {
    let previewContent = (
      <div className="mt-5">
        {" "}
        <div className="card">
          <div className="card-body">{ReactHtmlParser(this.state.preview)}</div>
        </div>
      </div>
    );

    return (
      <div className="container">
        <h1 className="display-4 text-center">Ask Your Question</h1>
        <p className="lead text-center">Use Editor Wisely</p>
        <InputComponent
          name="subject"
          type="text"
          value={this.state.subject}
          OnChange={this.onSubjectChange}
          error={this.state.errors.subject}
          placeholder="Please Enter Related Subject"
        />
        <CKEditor
          editor={ClassicEditor}
          data={this.state.text}
          onChange={this.OnEditorChange}
        />
        {this.state.errors.text && <div>{this.state.errors.text}</div>}
        <input
          type="submit"
          className="btn btn-info mt-4"
          onClick={this.OnSubmit}
        />

        <input
          type="button"
          className="btn btn-info mt-4 ml-4"
          onClick={this.viewPreview}
          value="Preview"
        />
        {this.state.preview.length > 0 ? previewContent : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createPost }
)(withRouter(CreatePost));
