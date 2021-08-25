import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEYS} from '../../../shared/constants';

export const authEffects = (dispatch) => ({
  async loginAction(payload) {
    // fire login request
    dispatch.auth.loginRequest(payload);

    // delay for 2 sec
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // set token in async storage
    await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, payload.token);

    // fire login success action
    dispatch.auth.loginSuccess(payload);
  },
  async logoutAction() {
    // reset token in async storage
    await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);

    dispatch.auth.logout();
  },
});
