import {
  SET_LOADER,
  SET_PROFILE,
  allErrors,
  SET_CURRENT_USER,
  SET_PROFILES
} from "./types";
import axios from "axios";

export const getUserProfile = () => dispatch => {
  dispatch(setLoading());
  axios
    .get("/api/profile")
    .then(result => {
      dispatch({
        type: SET_PROFILE,
        payload: result.data
      });
    })
    .catch(e => {
      dispatch({
        type: SET_PROFILE,
        payload: {}
      });
    });
};

export const getProfiles = () => dispatch => {
  dispatch(setLoading());
  axios
    .get("/api/profile/all")
    .then(result => {
      dispatch({
        type: SET_PROFILES,
        payload: result.data
      });
    })
    .catch(e => {
      const { errors } = e.response.data;
      dispatch({
        type: allErrors,
        errors
      });
    });
};

export const getProfileByHandle = handle => dispatch => {
  dispatch(setLoading());

  axios
    .get(`/api/profile/handle/${handle}`)
    .then(result => {
      dispatch({
        type: SET_PROFILE,
        payload: result.data
      });
    })
    .catch(e => {
      dispatch({
        type: SET_PROFILE,
        payload: {}
      });
    });
};

export const createUserProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile/", profileData)
    .then(result => {
      history.push("/dashboard");
    })
    .catch(e => {
      if (e.response.data) {
        let { errors } = e.response.data;

        dispatch({
          type: allErrors,
          errors
        });
      }
    });
};

export const editUserProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile/", profileData)
    .then(result => {
      history.push("/dashboard");
    })
    .catch(e => {
      if (e.response.data) {
        console.log(e.response.data);
        let { errors } = e.response.data;

        dispatch({
          type: allErrors,
          errors
        });
      }
    });
};

export const addEducation = (educationData, history) => dispatch => {
  axios
    .post("api/profile/education", educationData)
    .then(response => {
      history.push("/dashboard");
    })
    .catch(e => {
      let { errors } = e.response.data;
      console.log(errors);
      dispatch({
        type: allErrors,
        errors
      });
    });
};
export const addExperience = (experienceData, history) => dispatch => {
  axios
    .post("api/profile/experience", experienceData)
    .then(response => {
      history.push("/dashboard");
    })
    .catch(e => {
      let { errors } = e.response.data;

      dispatch({
        type: allErrors,
        errors
      });
    });
};

export const deleteEducation = id => dispatch => {
  axios
    .delete(`api/profile/education/${id}`)
    .then(result => {
      dispatch({
        type: SET_PROFILE,
        payload: result.data
      });
    })
    .catch(e => {
      let { errors } = e.response.data;

      dispatch({
        type: allErrors,
        errors
      });
    });
};

export const deleteExperience = id => dispatch => {
  axios
    .delete(`api/profile/experience/${id}`)
    .then(result => {
      dispatch({
        type: SET_PROFILE,
        payload: result.data
      });
    })
    .catch(e => {
      let { errors } = e.response.data;

      dispatch({
        type: allErrors,
        errors
      });
    });
};

export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete("/api/profile")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

export const setLoading = () => {
  return {
    type: SET_LOADER
  };
};
