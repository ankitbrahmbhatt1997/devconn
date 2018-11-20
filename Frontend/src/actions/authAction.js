import axios from "axios";
import { allErrors, SET_CURRENT_USER } from "../actions/types";
import setAuthToken from "../utils/setAuthToken";
import jwtDecode from "jwt-decode";
import { SET_PROFILE } from "./types";

export const registerUser = (userData, history) => {
  return dispatch => {
    axios
      .post("/api/auth/register", userData)
      .then(data => {
        history.push("/login");
      })
      .catch(e => {
        let { errors } = e.response.data;

        dispatch({
          type: allErrors,
          errors
        });
      });
  };
};

export const loginUser = userData => dispatch => {
  axios
    .post("/api/auth/login", userData)
    .then(res => {
      let { token } = res.data;
      //storing the jwt token in localStorage
      localStorage.setItem("jwtToken", token);
      //setting the axios default header authorization to jwtToken
      setAuthToken(token);
      // gettin the user data by decoding jwt
      let authUser = jwtDecode(token);
      //dispatching an action to set the current user in global state
      dispatch(setCurrentUser(authUser));
    })
    .catch(e => {
      if (e.response.data) {
        let { errors } = e.response.data;
        dispatch({
          type: allErrors,
          errors
        });
      }
      if (e.response.data) {
        let { errors } = e.response.data;
        dispatch({
          type: allErrors,
          errors
        });
      }
    });
};

export const logoutUser = history => dispatch => {
  //removing the jwt token from local storage
  localStorage.removeItem("jwtToken");
  //removing the auth token from axios header
  setAuthToken(false);
  //removing the user object from state
  dispatch(setCurrentUser({}));
  dispatch({
    type: SET_PROFILE,
    payload: {}
  });
  history.push("/login");
};

export const changeImage = Image => dispatch => {
  const ImageData = new FormData();
  ImageData.append("myImage", Image);
  axios
    .post("/api/auth/changeimage", ImageData)
    .then(result => {
      let { user } = result.data;
      dispatch(setCurrentUser(user));
    })
    .catch(err => {
      console.log(err.response);
      let errors = err.response.data;
      dispatch({
        type: allErrors,
        errors
      });
    });
};

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    user
  };
};
