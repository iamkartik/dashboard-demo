import { FETCH_COUNTRY_SECTOR_AGG, FETCH_SECTOR_ACTIVITY_AGG, FETCH_SECTOR_AVG, FETCH_COUNTRY_AVG } from "../actions/actions";

/**
 * Reducer for page one Aggregate queries
 */

export default function(state={},action){
    let  newState={};
    switch (action.type) {
        case FETCH_COUNTRY_SECTOR_AGG:
            let {data:csagg} = action.payload;
            newState = {...state,csagg};
            return newState;    
        case FETCH_SECTOR_ACTIVITY_AGG:
            let {data:sagg} = action.payload;
            newState = {...state,sagg};
            return newState;  
        case FETCH_SECTOR_AVG:
            let {data:sector} = action.payload;
            newState = {...state,sector};
            return newState;  
        case FETCH_COUNTRY_AVG:
            let {data:country} = action.payload;
            newState = {...state,country};
            return newState;        
        default:
            return state;
    }
}