import { createStore } from "redux";
import rootReducer from "./index.js";

const store = createStore(rootReducer);

export default store;
