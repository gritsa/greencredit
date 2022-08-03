import { postTypes } from "../contants/action-types";

const initState = {
  post: ''
};

export default (state = initState, action) => {
  switch (action.type) {
    case postTypes.POST_REQUEST:
      state = {
        ...state,
      };
      break;
    case postTypes.POST_SUCESS:
      state = {
        post: action.payload.post,
        message: action.payload.message,
      };
      break;
    case postTypes.POST_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    case postTypes.ADD_COMMENT_REQUEST:
      state = {
        ...state,
      };
      break;
    case postTypes.ADD_COMMENT_SUCCESS:
      state = {
        post: action.payload.post,
        message: action.payload.message,
      };
      break;
    case postTypes.ADD_COMMENT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    default:
  }
  return state;
};
