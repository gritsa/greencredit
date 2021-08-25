import {authEffects} from './auth.effects';
import {authReducer} from './auth.reducer';

const initialState = {
  token: null,
  user: null,
  isLoginInProcess: false,
};

export const authStore = {
  state: initialState,
  reducers: authReducer,
  effects: authEffects,
};
