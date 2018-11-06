const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostsInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";
  data.subject = !isEmpty(data.subject) ? data.subject : "";

  if (!Validator.isLength(data.subject, { min: 10, max: 200 })) {
    errors.subject = "Subject must be between 10 to 200 characters";
  }

  if (!Validator.isLength(data.text, { min: 10, max: 1000 })) {
    errors.text = "post must be between 10 to 1000 characters";
  }

  if (Validator.isEmpty(data.subject)) {
    errors.subject = "subject field is required";
  }
  if (Validator.isEmpty(data.text)) {
    errors.text = "Post field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
