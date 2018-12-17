import axios from 'axios';

import {
  ADD_POST,
  EDIT_POST,
  GET_POSTS,
  DELETE_POST,
  SEND_MESSAGE,
  CLEAR_MESSAGE,
  FETCH_LOADING,
  FETCH_SUCCESS,
  FETCH_ERROR
} from './types';

// Get Posts
export const getPosts = () => dispatch => {
  dispatch(fetchLoading());

  axios
    .get('/api/posts')
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
      dispatch(fetchSuccess());
    })
    .catch(() => {
      dispatch(fetchError());
    });
};

// Add Post
export const addPost = postData => dispatch => {
  // dispatch(postStarted());

  axios
    .post('/api/posts', postData)
    .then(res => {
      dispatch(postSuccess(res.data));
    })
    .then(() => {
      dispatch(sendMessage({ message: 'POST ADDED!' }));
      setTimeout(() => {
        dispatch(clearMessage())
      }, 2000);
    })
    .catch(err => {
      dispatch(sendMessage({ message: 'ERROR ADDING POST!' }));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 2000);
    })
};

export const editPost = postData => dispatch => {
  axios
    .post('/api/posts/edit', postData)
    .then(res =>
      dispatch({
        type: EDIT_POST,
        payload: res.data
      })
    )
    .then(() => {
      dispatch(sendMessage({ message: 'POST EDITED!' }));
      setTimeout(() => {
        dispatch(clearMessage())
      }, 2000);
    })
    .catch(err => {
      dispatch(sendMessage({ message: 'ERROR EDITING POST!' }));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 2000);
    })
};

// Delete Post
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .then(() => {
      dispatch(sendMessage({ message: 'POST DELETED!' }));
      setTimeout(() => {
        dispatch(clearMessage())
      }, 2000);
    })
    .catch(err => {
      dispatch(sendMessage({ message: 'ERROR DELETING POST!' }));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 2000);
    })
};





// Helper Dispatchers
const postSuccess = data => ({
  type: ADD_POST,
  payload: {
    ...data
  }
});

const sendMessage = message => ({
  type: SEND_MESSAGE,
  payload: {
    ...message
  }
});

const clearMessage = () => ({
  type: CLEAR_MESSAGE
});

// const postError = err => ({
//   type: GET_ERRORS,
//   payload: err.response.data.message
// });

// const clearError = () => ({
//   type: CLEAR_ERRORS
// });

const fetchLoading = () => ({
  type: FETCH_LOADING
});

const fetchSuccess = () => ({
  type: FETCH_SUCCESS
});

const fetchError = () => ({
  type: FETCH_ERROR
});
