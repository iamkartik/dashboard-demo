import {combineReducers} from 'redux';
import { LOGOUT_USER } from '../actions/actions';
import authReducer from './authReducer';
import homeReducer from './homeReducer';
import geoReducer from './geoReducer';
import aggReducer from './aggReducer';

/**
 * This file contains the combination  of all reducers inside the application
 */
const appReducer = combineReducers({
    auth:authReducer,
    home:homeReducer,
    geo:geoReducer,
    agg:aggReducer
});

// root reducer changes the state of app to undefined incase of logout
const rootReducer = (state,action)=>{
    if(action.type===LOGOUT_USER){
        state = undefined;
    }
    return appReducer(state,action);
}

export default rootReducer;