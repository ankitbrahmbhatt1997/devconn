import React from "react";
import { Link } from "react-router-dom";
import htmlParser from "react-html-parser";

export default function SinglePostAnswers(props) {
  let Content = props.post.answers.map(singleAnswer => {
    return (
      <div className="card card-body mb-3" key={singleAnswer._id}>
        <div className="row">
          <div className="col-md-2">
            <Link to="/userProfile">
              <img
                className="rounded-circle d-none d-md-block"
                src={singleAnswer.avatar}
                alt="User Image"
              />
            </Link>
            <br />
            <p className="text-center">{singleAnswer.name}</p>
          </div>
          <div className="col-md-10">
            <div className="lead">{htmlParser(singleAnswer.text)}</div>
          </div>
        </div>
      </div>
    );
  });
  return <div>{Content}</div>;
}
