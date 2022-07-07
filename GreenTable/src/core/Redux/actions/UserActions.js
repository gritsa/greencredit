import { ActionTypes } from "../contants/action-types";
// import axios from "../../services/axios";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signup = (userform) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.SIGNUP_REQUEST });
    // const res = await axios.get(`/user/${userform.userId}`, userform);
    const res = await axios.post(`http://54.148.23.236:805/api/register/`, userform);
    if (res.status === 201) {
      const user = res.data;
      const token = 123456789;
      try {
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user", JSON.stringify(data));
      } catch (error) {
        console.log(error + "Local Storage Hanged!!!");
      }
      dispatch({
        type: ActionTypes.SIGNUP_SUCESS,
        payload: {
          token,
          user,
          message: "Response Saved!",
        },
      });
    } else if (res.status === 400) {
      dispatch({
        type: ActionTypes.SIGNUP_FAILURE,
        payload: { error: "Something Went Wrong!!!" },
      });
    }
  };
};

// export const signup = (userData) => {
//   return async (dispatch) => {
//     dispatch({ type: ActionTypes.SIGNUP_REQUEST });
//     const res = await axios.get("/allUser", userData);
//     console.log(userData)
//     console.log(res + "Action-11");

//     // try {
//     //   await AsyncStorage.setItem("user", JSON.stringify(userData));
//     //   await AsyncStorage.setItem("token", JSON.stringify(""));
//     //   console.log(userData);
//     // } catch (error) {
//     //   console.log(error);
//     // }
//     // if (res.status === 200) {
//     //   const { token, user } = res.data;
//     //   try {
//     //     await AsyncStorage.setItem("token", token);
//     //     await AsyncStorage.setItem("user", JSON.stringify(user));
//     //   } catch (error) {
//     //     console.log(error);
//     //   }
//     //   dispatch({
//     //     type: ActionTypes.SIGNUP_SUCESS,
//     //     payload: { user, token },
//     //   });
//     // } else {
//     //   dispatch({
//     //     type: ActionTypes.SIGNUP_FAILURE,
//     //     payload: { error: res.data.message },
//     //   });
//     // }
//   };
// };
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const user = await AsyncStorage.getItem("user");
      dispatch({
        type: ActionTypes.SIGNUP_SUCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: ActionTypes.SIGNUP_FAILURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};
