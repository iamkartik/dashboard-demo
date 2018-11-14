import axios from 'axios';
import { LOGIN_USER, LOGOUT_USER, FETCH_USER, FETCH_COUNTRY_COUNT, FETCH_SECTOR_COUNT, FETCH_REGION_COUNT, FETCH_ACTIVITY_COUNT, FETCH_COUNTRY_SUM, FETCH_COUNTRY_SECTOR_AGG, FETCH_SECTOR_ACTIVITY_AGG } from './actions';

export const loginUser=(username,password)=>{
    return async (dispatch)=>{
        const user = await axios.post('/login',{username,password});
        console.log('returned user -->',user);
        dispatch({type:LOGIN_USER,payload:user});
    }
}

export const logoutUser=()=>{
    return async (dispatch)=>{
        const response = await axios.get('/logout');
        console.log('logout response -->',response)
        dispatch({type:LOGOUT_USER,payload:response});
    }
}

export const fetchUser=()=>{
    return async (dispatch)=>{
        const user = await axios.get('/user/current',{withCredentials:true});
        console.log('current user -->',user);
        dispatch({type:FETCH_USER,payload:user});
    }
}

export const fetchCountryCount=(no)=>{
    return async (dispatch)=>{
        const countryCount = await axios.get(`/analytics/total/country/${no}`,{withCredentials:true});
        console.log(countryCount);
        dispatch({type:FETCH_COUNTRY_COUNT,payload:countryCount});
    }
}

export const fetchSectorCount=(no)=>{
    return async (dispatch)=>{
        const sectorCount = await axios.get(`/analytics/total/sector/${no}`,{withCredentials:true});
        console.log(sectorCount);
        dispatch({type:FETCH_SECTOR_COUNT,payload:sectorCount});
    }
}

export const fetchRegionCount=(no)=>{
    return async (dispatch)=>{
        const regionCount = await axios.get(`/analytics/total/region/${no}`,{withCredentials:true});
        console.log(regionCount);
        dispatch({type:FETCH_REGION_COUNT,payload:regionCount});
    }
}

export const fetchActivityCount=(no)=>{
    return async (dispatch)=>{
        const activityCount = await axios.get(`/analytics/total/activity/${no}`,{withCredentials:true});
        console.log(activityCount);
        dispatch({type:FETCH_ACTIVITY_COUNT,payload:activityCount});
    }
}


export const fetchCountrySum=()=>{
    return async (dispatch)=>{
        const countrySum = await axios.get(`/analytics/country/sum`,{withCredentials:true});
        console.log(countrySum);
        dispatch({type:FETCH_COUNTRY_SUM,payload:countrySum});
    }
}


export const fetchCountrySectorAgg=(no)=>{
    return async (dispatch)=>{
        const csagg = await axios.get(`/analytics/agg/country/sector/${no}`,{withCredentials:true});
        console.log(csagg);
        dispatch({type:FETCH_COUNTRY_SECTOR_AGG,payload:csagg});
    }
}

export const fetchSectorActivityAgg=(no)=>{
    return async (dispatch)=>{
        const s_agg = await axios.get(`/analytics/agg/sector/activity/${no}`,{withCredentials:true});
        console.log(s_agg);
        dispatch({type:FETCH_SECTOR_ACTIVITY_AGG,payload:s_agg});
    }
}