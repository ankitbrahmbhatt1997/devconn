import React from "react";
import propTypes from "prop-types";
import classnames from "classnames";

function SocialInputComponent({
  icon,
  name,
  placeholder,
  value,
  error,
  OnChange,
  type
}) {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={`fab fa-${icon}`} />
        </span>
      </div>
      <input
        type={type}
        className="form-control form-control-lg"
        placeholder={placeholder}
        name={name}
        onChange={OnChange}
        value={value}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

SocialInputComponent.propTypes = {
  name: propTypes.string.isRequired,
  placeholder: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  error: propTypes.string,
  OnChange: propTypes.func.isRequired,
  type: propTypes.string.isRequired,
  icon: propTypes.string.isRequired
};

export default SocialInputComponent;
