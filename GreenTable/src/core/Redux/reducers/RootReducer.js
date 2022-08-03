import { combineReducers } from "redux";
import authReducer from "./authReducer";
import PostReducer from "./PostReducer";
import GreenCreditReducer from "./GreenCreditReducer";

const Reducers = combineReducers({
  user: authReducer,
  post: PostReducer,
  creditPoints: GreenCreditReducer
});

export default Reducers;
