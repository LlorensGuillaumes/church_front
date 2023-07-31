import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { usersReducer } from "./users/users.reducer";
import { infoReducer } from "./info/info.reducer";

const rootReducer = combineReducers({
    users: usersReducer,
    info: infoReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;