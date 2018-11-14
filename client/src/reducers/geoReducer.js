import { FETCH_COUNTRY_SUM } from "../actions/actions";



export default function(state={},action){
    let  newState={};
    switch (action.type) {
        case FETCH_COUNTRY_SUM:
            let {data:sum} = action.payload.data;
            newState = {...state,sum};
            return newState;    
        default:
            return state;
    }
}