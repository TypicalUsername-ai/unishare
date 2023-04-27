const initialState = {
    authenticationToken: ,
    userId: '',
} 

loggedReducer = (state=initialState, action) => {
    switch(action.type){
        case 'GET_TOKEN' :
            return state.authenticationToken;
        case 'GET_USER' :
            return state.userId;
            default:
                return state;
    }
};

export default loggedReducer;