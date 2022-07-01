import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Store } from '../Redux/store';

let token;
async function gettingToken() {
  token = await AsyncStorage.getItem('token');
}

gettingToken();

const axiosInstance = axios.create({
  baseURL: 'http://54.148.23.236:805/api/',
  headers: {
    Authorization: token ? `bearer ${token}` : '',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(req => {
  const { user } = Store.getState();
  if (user.token) {
    req.headers.Authorization = `bearer ${user.token}`;
  }
  return req;
});

axiosInstance.interceptors.response.use(
  res => {
    return res;
  },
  error => {
    const status = error.response ? error.response.status : 500;
    return Promise.reject(status);
  },
);

export default axiosInstance;
