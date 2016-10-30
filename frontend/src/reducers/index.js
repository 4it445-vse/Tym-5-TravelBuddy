import { combineReducers } from 'redux';

const dummy = (state = null, action) => {
  console.log('---- action:', action);
  return state;
}

const defaultShoppingCart = {
  1: {
    product: { title: 'abc', id: 1 },
    count: 1,
  },
  2: {
    product: { title: '123', id: 2 },
    count: 10,
  },
};

const shoppingCart = (state={ ...defaultShoppingCart }, action) => {
  return state;
}

export const rootReducer = combineReducers({
  dummy,
  shoppingCart,
});
