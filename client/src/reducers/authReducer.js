import { LOGIN_USER, LOGOUT_USER, FETCH_USER } from "../actions/actions";

const initialState={
    isAuthenticated:false
}

export default function(state=initialState,action){
    let  newState={};
    switch (action.type) {
        case LOGIN_USER:
            let {data} = action.payload;
            console.log(data.err?false:true);
            newState["isAuthenticated"] = data.err?false:true;
            newState = {...newState,data};
            return newState;    
        case LOGOUT_USER:
            newState["isAuthenticated"] = false;
            return newState;
        case FETCH_USER:
            data = action.payload.data;
            newState["isAuthenticated"] = data.err?false:true;
            return newState;
        default:
            return state;
    }
}