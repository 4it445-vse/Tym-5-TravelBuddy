import { combineReducers } from 'redux';
import authentificationReducer from './authentificationReducer';
import searchReducer from './search_products';

const containerReducer = combineReducers({
  //add reducers so they will be added to Store
  authentificationReducer, searchReducer
});

export default containerReducer;
