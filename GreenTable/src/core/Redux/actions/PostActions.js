import { PostTypes } from "../contants/action-types";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const post_image = (userform) => {
    
    return async (dispatch) => {
      try{
      dispatch({ type: PostTypes.POST_REQUEST });
      // const res = await axios.get(`/user/${userform.userId}`, userform);
      const res = await axios.post(`http://54.148.23.236:805/api/create/activities/`, userform);
      if (res.status === 201) {
        const post = res.data;
        console.log(res.data);
        
       
        dispatch({
          type: PostTypes.POST_SUCESS,
          payload: {
            
            post,
            message: "Image Upload Sucess",
          },
        });
      } else if (res.status === 400) {
        dispatch({
          type: ActionTypes.SIGNUP_FAILURE,
          payload: { error: "Something Went Wrong!!!" },
        });
      }
    }catch(e){
      console.log('Error')
    }
    };
  };