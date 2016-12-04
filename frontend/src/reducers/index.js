import { combineReducers } from 'redux';
import authentificationReducer from './authentificationReducer';


const containerReducer = combineReducers({
  //add reducers so they will be added to Store
  authentificationReducer
});

export default containerReducer;
