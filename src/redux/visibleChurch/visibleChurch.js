const initialStates = [];

const visibleChurchReducer = (state = initialStates, action) => {
    switch (action.type){
        case "SET":
            return state;
            
        default:
            return state;
    }
}

export default visibleChurchReducer;