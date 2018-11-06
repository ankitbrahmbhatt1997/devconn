import { SET_PROFILE, SET_LOADER, SET_PROFILES } from "../actions/types";

const initialState = {
  loaderRequired: false,
  userProfile: null,
  profiles: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADER:
      return {
        ...state,
        loaderRequired: true
      };
    case SET_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
        loaderRequired: false
      };
    case SET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loaderRequired: false
      };
    default:
      return state;
  }
};
