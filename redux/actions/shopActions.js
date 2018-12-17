import axios from 'axios';

import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  SEND_MESSAGE,
  CLEAR_MESSAGE,
  FETCH_LOADING,
  FETCH_SUCCESS,
  FETCH_ERROR
} from './types';

// Get Products
export const getProducts = () => dispatch => {
  dispatch(fetchLoading());

  axios
    .get('/api/products')
    .then(res => {
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data
      })
      dispatch(fetchSuccess());
    })
    .catch(() => {
      dispatch(fetchError());
    });
};

// Add Post
export const addProduct = productData => dispatch => {
  // dispatch(postStarted());

  axios
    .post('/api/products', productData)
    .then(res => {
      dispatch(productSuccess(res.data));
    })
    .then(() => {
      dispatch(sendMessage({ message: 'PRODUCT ADDED!' }));
      setTimeout(() => {
        dispatch(clearMessage())
      }, 2000);
    })
    .catch(err => {
      dispatch(sendMessage({ message: 'ERROR ADDING PRODUCT!' }));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 2000);
    })
};

// Edit Product
export const editProduct = productData => dispatch => {
  axios
    .post('/api/products/edit', productData)
    .then(res =>
      dispatch({
        type: EDIT_PRODUCT,
        payload: res.data
      })
    )
    .then(() => {
      dispatch(sendMessage({ message: 'PRODUCT EDITED!' }));
      setTimeout(() => {
        dispatch(clearMessage())
      }, 2000);
    })
    .catch(err => {
      dispatch(sendMessage({ message: 'ERROR EDITING PRODUCT!' }));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 2000);
    })
};

// Delete Product
export const deleteProduct = id => dispatch => {
  axios
    .delete(`/api/products/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_PRODUCT,
        payload: id
      })
    )
    .then(() => {
      dispatch(sendMessage({ message: 'PRODUCT DELETED!' }));
      setTimeout(() => {
        dispatch(clearMessage())
      }, 2000);
    })
    .catch(err => {
      dispatch(sendMessage({ message: 'ERROR DELETING PRODUCT!' }));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 2000);
    })
};





// Helper Dispatchers
const productSuccess = data => ({
  type: ADD_PRODUCT,
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