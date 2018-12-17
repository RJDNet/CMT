import {
  GET_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST
} from '../actions/types';

const initialState = {
  posts: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload
      }
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      }
    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id === action.payload._id) {
            return {
              ...post,
              title: action.payload.title,
              text: action.payload.text
            };
          }
          return post;
        })
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      }

    default:
      return state;
  }
}