import { FETCH_COUNTRY_SECTOR_AGG, FETCH_SECTOR_ACTIVITY_AGG } from "../actions/actions";



export default function(state={},action){
    let  newState={};
    switch (action.type) {
        case FETCH_COUNTRY_SECTOR_AGG:
            let {data:csagg} = action.payload;
            console.log(action.payload.data)
            newState = {...state,csagg};
            return newState;    
        case FETCH_SECTOR_ACTIVITY_AGG:
            let {data:sagg} = action.payload;
            newState = {...state,sagg};
            return newState;        
        default:
            return state;
    }
}