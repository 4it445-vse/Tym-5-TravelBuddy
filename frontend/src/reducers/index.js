import { combineReducers } from 'redux';
import authentificationReducer from './authentificationReducer';
import booking from '../components/Booking/reducer.js';
import searchSection from '../components/HomePage/SearchSection/reducer.js';

//Dummy action
const dummy = (state=0, action) => {
  console.log('---- action:', action, 'state:', state);

  switch (action.type) {
    case 'DUMMY_ACTION':
      return state + 1;
    default:
      return state;
  }
}

export const containerReducer = combineReducers({
  //add reducers so they will be added to Store
 authentificationReducer,
 booking,
 dummy,
 searchSection
});
