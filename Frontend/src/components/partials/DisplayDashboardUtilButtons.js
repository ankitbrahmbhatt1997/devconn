import React from "react";
import { Link } from "react-router-dom";

export default function DisplayDashboardUtilButtons() {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/editProfile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
      </Link>
      <Link to="/addExperience" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1" />
        Add Experience
      </Link>
      <Link to="/addEducation" className="btn btn-light">
        <i className="fas fa-graduation-cap text-info mr-1" />
        Add Education
      </Link>
    </div>
  );
}
