import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectInputComponent = ({ name, value, error, OnChange, options }) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        onChange={OnChange}
      >
        {selectOptions}
      </select>

      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectInputComponent.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  OnChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectInputComponent;
