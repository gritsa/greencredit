import { PostTypes } from "../contants/action-types";

const initState = {
  post:''
};

export default (state = initState, action) => {
  switch (action.type) {
    case PostTypes.POST_REQUEST:
      state = {
        ...state,
       
      };
      break;
    case PostTypes.POST_SUCESS:
      state = {
        post:action.payload.post,
        message:action.payload.message,
        
      };
      break;
    case PostTypes.POST_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    default:
  }
  return state;
};
