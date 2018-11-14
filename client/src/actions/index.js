import axios from 'axios';
import { LOGIN_USER, LOGOUT_USER, FETCH_USER, FETCH_COUNTRY_COUNT, FETCH_SECTOR_COUNT, FETCH_REGION_COUNT, FETCH_ACTIVITY_COUNT, FETCH_COUNTRY_SUM, FETCH_COUNTRY_SECTOR_AGG, FETCH_SECTOR_ACTIVITY_AGG } from './actions';


/**
 * This file contains the api calls to the backend according to page
 * Once the call is success it dispatches an an action for reducer 
 * to update the respective state
 */

// login user
export const loginUser=(username,password)=>{
    return async (dispatch)=>{
        const user = await axios.post('/login',{username,password});
        dispatch({type:LOGIN_USER,payload:user});
    }
}

// logout user
export const logoutUser=()=>{
    return async (dispatch)=>{
        const response = await axios.get('/logout');
        dispatch({type:LOGOUT_USER,payload:response});
    }
}

// get logged in user
export const fetchUser=()=>{
    return async (dispatch)=>{
        const user = await axios.get('/user/current',{withCredentials:true});
        dispatch({type:FETCH_USER,payload:user});
    }
}

// get count according to country
export const fetchCountryCount=(no)=>{
    return async (dispatch)=>{
        const countryCount = await axios.get(`/analytics/total/country/${no}`,{withCredentials:true});
        dispatch({type:FETCH_COUNTRY_COUNT,payload:countryCount});
    }
}

// get count according to sector
export const fetchSectorCount=(no)=>{
    return async (dispatch)=>{
        const sectorCount = await axios.get(`/analytics/total/sector/${no}`,{withCredentials:true});
        dispatch({type:FETCH_SECTOR_COUNT,payload:sectorCount});
    }
}


// get count according to region
export const fetchRegionCount=(no)=>{
    return async (dispatch)=>{
        const regionCount = await axios.get(`/analytics/total/region/${no}`,{withCredentials:true});
        dispatch({type:FETCH_REGION_COUNT,payload:regionCount});
    }
}


// get count according to activity
export const fetchActivityCount=(no)=>{
    return async (dispatch)=>{
        const activityCount = await axios.get(`/analytics/total/activity/${no}`,{withCredentials:true});
        dispatch({type:FETCH_ACTIVITY_COUNT,payload:activityCount});
    }
}

// get the total loan amount for each country
export const fetchCountrySum=()=>{
    return async (dispatch)=>{
        const countrySum = await axios.get(`/analytics/country/sum`,{withCredentials:true});
        dispatch({type:FETCH_COUNTRY_SUM,payload:countrySum});
    }
}

// get the country/sector aggregate
export const fetchCountrySectorAgg=(no)=>{
    return async (dispatch)=>{
        const csagg = await axios.get(`/analytics/agg/country/sector/${no}`,{withCredentials:true});
        dispatch({type:FETCH_COUNTRY_SECTOR_AGG,payload:csagg});
    }
}

// get the sector/activity aggregate
export const fetchSectorActivityAgg=(no)=>{
    return async (dispatch)=>{
        const s_agg = await axios.get(`/analytics/agg/sector/activity/${no}`,{withCredentials:true});
        dispatch({type:FETCH_SECTOR_ACTIVITY_AGG,payload:s_agg});
    }
}