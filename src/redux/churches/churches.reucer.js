const INITAL_STATE = {
    allInfo: [],
    info: null,
    loading: false,
    error: null,
    infoFiltered: [],
  };

  export const infoReducer = (state = INITAL_STATE, action) => {
    switch (action.type) {
        case "LOADING":
            return { ...state, loading: true};
        case "ERROR":
            return {
                ...state,
                allInfo: [],
                error: action.payload,
                infoFiltered:[],
                info: null,
                loading: false,
            };
        case "GET_CHURCHES":
            return {
                ...state,
                allInfo: [...action.payload],
                error:null,
                infoFiltered: [...action.payload],
                info: null,
                loading: false,
            };
        default:
                return { ...state};
    }
  }