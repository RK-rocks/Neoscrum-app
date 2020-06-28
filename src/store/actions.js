const loginSuccess = async ({
  commit
}) => {
  commit("loginSuccess");
};

const logout = async ({
  commit
}) => {
  localStorage.clear();
  commit("logout");
};

const loader = async ({
  commit
}, value) => {
  commit("LOADER", value);
};

export default {
  loginSuccess,
  logout,
  loader,
};
