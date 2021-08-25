import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeEventEmitter} from 'react-native';

import {APP_EVENTS, HTTP_REQUEST_TIME_OUT, STORAGE_KEYS} from '../../shared/constants';
import {isNetworkConnected} from '../../shared/utils';

const httpInstance = axios.create({
  timeout: HTTP_REQUEST_TIME_OUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// intercept request
httpInstance.interceptors.request.use(async (reqConfig) => {
  // check if internet is connected
  if (!isNetworkConnected) {
    return Promise.reject(new Error(''));
  }

  let headers = reqConfig.headers;
  // add token related info here..
  const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
  if (token) {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return {...reqConfig, headers};
});

// intercept response
httpInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.status === 401) {
      // emit invalid auth token event and do logout
      // new NativeEventEmitter().emit(APP_EVENTS.INVALID_AUTH_TOKEN);
    }
    return Promise.reject(error);
  },
);

export default httpInstance;
