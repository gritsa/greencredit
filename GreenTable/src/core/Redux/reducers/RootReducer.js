import { combineReducers } from "redux";
import authReducer from "./authReducer";
import PostReducer from "./PostReducer";

const Reducers = combineReducers({
  user: authReducer,
  post:PostReducer
});

export default Reducers;
