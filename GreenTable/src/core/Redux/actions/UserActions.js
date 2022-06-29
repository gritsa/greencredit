import { ActionTypes } from '../contants/action-types';
import { API_URLS } from '../../../shared/constants/api-urls';
import httpInstance from '../../services/interceptor';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

export const signup = (userData) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.SIGNUP_REQUEST });
    const res = await axios.post('/users/signup/', userData);
    if (res.status === 200) {

      const { token, user } = res.data;
      try {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.log(error);
      }
      dispatch({
        type: ActionTypes.SIGNUP_SUCESS,
        payload: { user, token },
      });
    } else {
      dispatch({
        type: ActionTypes.SIGNUP_FAILURE,
        payload: { error: res.data.message },
      });
    }
  };
};
export const isuserLoggedIn = () => {
  return async (dispatch) => {
    const token = AsyncStorage.getItem("token");
    if (token) {
      const user = AsyncStorage.getItem("user");
      dispatch({
        type: authConstants.LOGIN_SUCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};