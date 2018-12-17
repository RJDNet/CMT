import { GET_KEY, GEN_KEY } from '../actions/types';

const initialState = {
  pkey: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_KEY:
      return {
        ...state,
        pkey: action.payload
      }
    case GEN_KEY:
      return {
        ...state,
        pkey: action.payload
      }
    default:
      return state;
  }
}