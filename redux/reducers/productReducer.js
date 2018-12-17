import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT
} from '../actions/types';

const initialState = {
  products: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }
    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products]
      }
    case EDIT_PRODUCT:
      return {
        ...state,
        products: state.products.map(product => {
          if (product._id === action.payload._id) {
            return {
              ...product,
              title: action.payload.title,
              text: action.payload.text,
              category: action.payload.category,
              price: action.payload.price,
              image: action.payload.image
            };
          }
          return product;
        })
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => product._id !== action.payload)
      }

    default:
      return state;
  }
}