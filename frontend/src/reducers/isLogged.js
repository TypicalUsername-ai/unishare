const initialState = {
    token: false,
    authenticationCode: ""
}

const loggedReducer = (state=initialState, action) => {
    switch(action.type){
        case 'IS_TRUE' :
            return state.token;
        case 'GET_TOKEN': return {
            ...state,
            authenticationCode: action.payload
        }
        default:
            return state.token;
        
    }
};

export default loggedReducer;