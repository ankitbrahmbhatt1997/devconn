import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { connect } from "react-redux";
import { addAnswer } from "../../../actions/postActions";

class SinglePostEditor extends Component {
  state = {
    text: ""
  };

  OnEditorChange = (event, editor) => {
    let data = editor.getData();
    this.setState(() => ({
      text: data
    }));
  };
  OnSubmit = e => {
    let answerData = {
      text: this.state.text
    };

    this.props.addAnswer(answerData, this.props.post._id);
  };

  render() {
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Answer The Question
          </div>
          <div>
            <CKEditor
              editor={ClassicEditor}
              data={this.state.text}
              onChange={this.OnEditorChange}
            />
            <button onClick={this.OnSubmit} className="btn btn-dark mt-3">
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addAnswer }
)(SinglePostEditor);
