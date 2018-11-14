import {combineReducers} from 'redux';
import { LOGOUT_USER } from '../actions/actions';
import authReducer from './authReducer';
import homeReducer from './homeReducer';
import geoReducer from './geoReducer';
import aggReducer from './aggReducer';

const appReducer = combineReducers({
    auth:authReducer,
    home:homeReducer,
    geo:geoReducer,
    agg:aggReducer
});

const rootReducer = (state,action)=>{
    if(action.type===LOGOUT_USER){
        state = undefined;
    }
    return appReducer(state,action);
}

export default rootReducer;