import { actionTypes, authConstants } from "../contants/action-types";

const initState = {
  token: null,
  user: "",
  authenticate: false,
  authenticating: false,
  loading: false,
  error: "",
  message: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case actionTypes.SIGNUP_SUCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        message: action.payload.message,
        authenticate: true,
        authenticating: false,
        loading: false,
      };
      break;
    case actionTypes.SIGNUP_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    case authConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.LOGOUT_SUCESS:
      state = {
        ...initState,
      };
      break;
    case authConstants.LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;

    default:
  }
  return state;
};
