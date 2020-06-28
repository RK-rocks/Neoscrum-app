const initialState = {
  isLogin: false,
  token: null,
  loader: ''
};

// getters
const getters = {
  isLogin: (state) => state.isLogin,
  token: (state) => state.token,
  loader_state: (state) => state.loader
};

// actions
const actions = {
  loginSuccess({
    commit
  }, token) {
    console.log('hellooo');
    commit('loginSuccess', token);
  },
  logout({
    commit
  }) {
    commit('logout');
  },
  loader({
    commit
  }, vallue) {
    commit("loader", vallue)
  }
};
// mutations
const mutations = {

  loginSuccess(state, token) {
    state.isLogin = true;
    state.token = token;
  },
  logout(state) {
    state.isLogin = false;
    state.token = null;
  },
  loader(state, value) {
    state.loader = value
  }
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
