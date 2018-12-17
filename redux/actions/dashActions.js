import axios from 'axios';

import {
  GET_KEY,
  GEN_KEY,
  GET_ERRORS,
  CLEAR_ERRORS
} from './types';

// Get API Key
export const getKey = () => dispatch => {
  axios
    .get('/auth/key')
    .then(res =>
      dispatch({
        type: GET_KEY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.message
      })
    );
};

// Generate Public API Key
export const genKey = () => dispatch => {
  axios
    .get('/auth/genkey')
    .then(res =>
      dispatch({
        type: GEN_KEY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.message
      })
    );
};
