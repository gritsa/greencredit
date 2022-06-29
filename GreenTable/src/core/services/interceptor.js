import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HTTP_REQUEST_TIME_OUT, STORAGE_KEYS } from '../../shared/constants';
import { isNetworkConnected } from '../../shared/utils';
import { BASEURL } from '../../shared/constants';
import { Store } from '../Redux/store';

let token;
async function gettingToken() {
  token = await AsyncStorage.getItem('token');
}

gettingToken();
const httpInstance = axios.create({
  baseURL: BASEURL,
  headers: {
    Authorization: token ? `bearer ${token}` : '',
    Accept: 'application/json',
  },
});

httpInstance.interceptors.request.use(req => {
  const { user } = Store.getState();

  if (user && user.token) {
    req.headers.Authorization = `bearer ${user.token}`;
  }
  return req;
});

httpInstance.interceptors.response.use(
  res => {
    return res;
  },
  error => {
    const status = error.response ? error.response.status : 500;
    return Promise.reject(status);
  },
);

// export default httpInstance;

export default httpInstance;
