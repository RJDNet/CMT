import { FETCH_LOADING, FETCH_SUCCESS, FETCH_ERROR } from '../actions/types';

const initialState = {
  loading: false,
  success: false,
  error: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        error: false
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false
      };
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: true
      }
    default:
      return state;
  };
};