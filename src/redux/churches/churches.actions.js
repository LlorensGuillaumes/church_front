import { API } from "../../shared/API/Api";
import store from "../store";
const { dispatch } = store;

export const getChurch = () => {
    API.get("churches")
        .then((res) => {
            dispatch({ type: "GET_CHURCHES", payload: res.data});

        })
        .catch((error) =>{
            dispatch({type:"ERROR", payload: error.response.data})
        })
};
