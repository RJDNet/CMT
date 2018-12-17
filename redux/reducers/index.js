import { combineReducers } from 'redux';
import keyReducer from './keyReducer';
import postReducer from './postReducer';
import productReducer from './productReducer';
import messageReducer from './messageReducer';
import errorReducer from './errorReducer';
import fetchReducer from './fetchReducer';

export default combineReducers({
  post: postReducer,
  pkey: keyReducer,
  product: productReducer,
  message: messageReducer,
  errors: errorReducer,
  fetching: fetchReducer
});