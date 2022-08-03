import { postTypes } from "../contants/action-types";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const post_image = (userform) => {
  return async (dispatch) => {
    try {
      dispatch({ type: postTypes.POST_REQUEST });
      // const res = await axios.get(`/user/${userform.userId}`, userform);
      const res = await axios.post(`http://54.148.23.236:805/api/create/activities/`, userform);
      if (res.status === 201) {
        const post = res.data;
        console.log(res.data);
        dispatch({
          type: postTypes.POST_SUCESS,
          payload: {

            post,
            message: "Image Upload Sucess",
          },
        });
      } else if (res.status === 400) {
        dispatch({
          type: actionTypes.SIGNUP_FAILURE,
          payload: { error: "Something Went Wrong!!!" },
        });
      }
    } catch (e) {
      console.log('Error')
    }
  };
};

export const getPosts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: postTypes.POST_REQUEST });
      const res = await axios.get(`http://54.148.23.236:805/api/get/activities/`);
      if (res.status === 201) {
        const data = [];
        if(res.data.length > 0) {
          res.data.forEach(element => {
            data.push({
              ...element,
              likeData: JSON.parse(element.likes),
              commentData: JSON.parse(element.comments),
              images: JSON.parse(element.photo_urls),
            })
          });
        }
        const post = res.data;
        dispatch({
          type: postTypes.POST_SUCESS,
          payload: {
            post,
            message: "Post Successfully Received",
          },
        });
      } else if (res.status === 400) {
        dispatch({
          type: actionTypes.SIGNUP_FAILURE,
          payload: { error: "Something Went Wrong!!!" },
        });
      }
    } catch (e) {
      console.log('Error')
    }
  };
};

export const postComment = (commentData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: postTypes.ADD_COMMENT_REQUEST });
      const res = await axios.post(`http://54.148.23.236:805/api/comments/`, commentData);
      if (res.status === 201) {
        const post = res.data;
        console.log(res.data);
        dispatch({
          type: postTypes.ADD_COMMENT_SUCCESS,
          payload: {
            post,
            message: "Comment Successfully Added",
          },
        });
      } else if (res.status === 400) {
        dispatch({
          type: postTypes.ADD_COMMENT_FAILURE,
          payload: { error: "Something Went Wrong!!!" },
        });
      }
    } catch (e) {
      console.log('Error')
    }
  };
};