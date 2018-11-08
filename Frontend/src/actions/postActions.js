import { SET_LOADER, allErrors, SET_POSTS, SET_POST } from "./types";
import axios from "axios";

export const createPost = (postData, history) => dispatch => {
  axios
    .post("/api/posts", postData)
    .then(result => {
      history.push("/posts");
    })
    .catch(err => {
      const { errors } = err.response.data;
      dispatch({
        type: allErrors,
        errors
      });
    });
};

export const getAllPosts = () => dispatch => {
  dispatch(setLoading());
  axios
    .get("api/posts/all")
    .then(result => {
      dispatch({
        type: SET_POSTS,
        payload: result.data
      });
    })
    .catch(err => {
      const { errors } = err.response.data;
      dispatch({
        type: SET_POSTS,
        payload: {}
      });
    });
};

export const getPostById = id => dispatch => {
  dispatch(setLoading());
  axios
    .get(`/api/posts/singlepost/${id}`)
    .then(result => {
      dispatch({
        type: SET_POST,
        payload: result.data
      });
    })
    .catch(err => {
      const { errors } = err.response.data;
      dispatch({
        type: allErrors,
        errors
      });
    });
};

export const addAnswer = (answerData, id) => dispatch => {
  axios
    .post(`/api/posts/answer/${id}`, answerData)
    .then(result => {
      dispatch({
        type: SET_POST,
        payload: result.data
      });
    })
    .catch(err => {
      const { errors } = err.response.data;
      dispatch({
        type: allErrors,
        errors
      });
    });
};

export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(result => {
      dispatch({
        type: SET_POST,
        payload: result.data
      });
    })
    .catch(err => {
      const { errors } = err.response.data;
      dispatch({
        type: allErrors,
        errors
      });
    });
};

export const addDislike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(result => {
      dispatch({
        type: SET_POST,
        payload: result.data
      });
    })
    .catch(err => {
      const { errors } = err.response.data;
      dispatch({
        type: allErrors,
        errors
      });
    });
};

export const setLoading = () => {
  return {
    type: SET_LOADER
  };
};
