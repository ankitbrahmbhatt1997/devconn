import React from "react";
import propTypes from "prop-types";
import classnames from "classnames";

function InputComponent({
  name,
  placeholder,
  value,
  error,
  OnChange,
  type,
  disabled
}) {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={OnChange}
        disabled={disabled}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

InputComponent.propTypes = {
  name: propTypes.string.isRequired,

  value: propTypes.string.isRequired,
  error: propTypes.string,
  OnChange: propTypes.func.isRequired
};

export default InputComponent;
