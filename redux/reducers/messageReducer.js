import { SEND_MESSAGE, CLEAR_MESSAGE } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEND_MESSAGE:
      return action.payload;
    case CLEAR_MESSAGE:
      return {};
    default:
      return state;
  };
};