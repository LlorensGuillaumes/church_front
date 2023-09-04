import { combineReducers } from "redux";
import userReducer from "./users/users.js";

const rootReducer = combineReducers({
    user: userReducer,
})

export default rootReducer;