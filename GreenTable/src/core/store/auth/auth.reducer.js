export const authReducer = {
  loginRequest(state, payload) {
    return {
      ...state,
      token: null,
      user: null,
      isLoginInProcess: true,
    };
  },
  loginSuccess(state, payload) {
    return {
      ...state,
      token: payload.token,
      user: payload.user,
      isLoginInProcess: false,
    };
  },
  logout(state) {
    return {
      ...state,
      token: null,
      user: null,
    };
  },
};
