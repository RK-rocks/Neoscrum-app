const loginSuccess = (state) => {
  state.isLogin = true;
  state.token = localStorage.getItem('token');
};

const logout = (state) => {
  state.isLogin = false;
  state.token = null;
};

const LOADER = (state, value) => {
  state.loader = value;
};

export default {
  loginSuccess,
  logout,
  LOADER,
};
