import { combineReducers } from 'redux';
import authReducer from "./authReducer";

const Reducers = combineReducers ({
    user : authReducer
})

export default Reducers;