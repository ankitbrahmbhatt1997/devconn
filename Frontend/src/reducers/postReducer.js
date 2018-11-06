import { SET_POSTS, SET_LOADER, SET_POST } from "../actions/types";

const initialState = {
  loadingRequired: false,
  singlePost: null,
  posts: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADER:
      return {
        ...state,
        loadingRequired: true
      };
    case SET_POST:
      return {
        ...state,
        singlePost: action.payload,
        loadingRequired: false
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loadingRequired: false
      };
    default:
      return state;
  }
};
