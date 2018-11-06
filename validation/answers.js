const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAnswersInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 1000 })) {
    errors.text = "answer must be between 10 to 1000 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "answer field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
