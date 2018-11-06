import React from "react";
import propTypes from "prop-types";
import classnames from "classnames";

function TextAreaInputComponent({ name, placeholder, value, error, OnChange }) {
  return (
    <div className="form-group">
      <textarea

        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={OnChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

TextAreaInputComponent.propTypes = {
  name: propTypes.string.isRequired,
  placeholder: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  error: propTypes.string,
  OnChange: propTypes.func.isRequired
};

export default TextAreaInputComponent;
