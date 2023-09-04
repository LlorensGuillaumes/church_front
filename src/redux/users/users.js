
const initialStates = {
  mail: null,
  rol: null,
  _id: null,
  
};

const userReducer = (state = initialStates, action) =>{

    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                mail: action.payload.mail,
                rol: action.payload.rol,
                _id: action.payload._id,
            };
        case "LOGOUT":
            return {
                ...state,
                mail: null,
                rol: null,
                _id: null,

            };
        default:
            return state;
    }
};

export default userReducer;