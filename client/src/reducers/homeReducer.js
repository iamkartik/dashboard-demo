import { FETCH_REGION_COUNT, FETCH_ACTIVITY_COUNT, FETCH_COUNTRY_COUNT, FETCH_SECTOR_COUNT } from "../actions/actions";

/** 
 * Reducer for the home page
*/

export default function(state={},action){
    let  newState={};
    switch (action.type) {
        case FETCH_REGION_COUNT:
            let {data:region} = action.payload.data;
            newState = {...state,region};
            return newState;    
        case FETCH_ACTIVITY_COUNT:
            let {data:activity} = action.payload.data;
            newState = {...state,activity};
            return newState;        
        case FETCH_COUNTRY_COUNT:
            let {data:country} = action.payload.data;
            newState = {...state,country};        
            return newState;
        case FETCH_SECTOR_COUNT:
            let {data:sector} = action.payload.data;
            newState = {...state,sector};
            return newState;
        default:
            return state;
    }
}