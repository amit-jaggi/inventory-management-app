import { combineReducers } from 'redux';
import viewReducer from './viewReducer';
import fetchDataReducer from './fetchDataReducer';

const rootReducer = combineReducers({
    viewReducer,
    fetchDataReducer,
})

export default rootReducer;