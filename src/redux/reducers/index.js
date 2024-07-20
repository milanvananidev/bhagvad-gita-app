import {combineReducers} from 'redux';
import metaDataReducer from './metaData';
import userReducer from './user';

const rootReducer = combineReducers({
  meta: metaDataReducer,
  user: userReducer,
});

export default rootReducer;
