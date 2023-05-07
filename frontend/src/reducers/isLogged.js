
const loggedReducer = (state="", action) => {
    switch(action.type){
        case 'GET_TOKEN' :
            return state;
        default:
            return state;
        
    }
};

export default loggedReducer;