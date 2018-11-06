import { allErrors } from "../actions/types";
const initialState = {
  errors: {}
};

export default (state = initialState, action) => {
  const errors = action.errors;
  switch (action.type) {
    case allErrors:
      return {
        ...errors
      };

    default:
      return state;
  }
};
