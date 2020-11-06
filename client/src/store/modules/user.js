export default {
  state: {
    auth: {
      user_id: null,
      token: null,
    },
    user: {},
  },
  mutations: {
    login(state, data = JSON.parse(localStorage.getItem("auth"))) {
      state.auth = data ? data : {};
    },
    logout(state) {
      state.auth = {};
    },
    updateCurrentUser(state, data) {
      state.user = data;
    },
  },
  actions: {
    async login({ commit }, user = {}) {
      return await fetch("/api/user/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            commit("login", data);
            localStorage.setItem("auth", JSON.stringify(data));
          }
          return data;
        });
    },
    logout({ commit }) {
      localStorage.removeItem("auth");
      commit("updateCurrentUser", {});
      commit("logout");
    },
    async registry({ commit }, form) {
      return await fetch("/api/user", {
        method: "POST",
        body: new FormData(form),
      })
        .then((res) => res.json())
        .then((data) => data);
    },
    async fetchUser({ commit, getters }) {
      return await fetch(`/api/user/${getters.isAuthorized.user_id}`, {
        method: "GET",
        headers: {
          "auth-token": getters.isAuthorized.token,
          "Content-Type": "applciation/json;charset=utf-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            commit("updateCurrentUser", data);
          }
          return data;
        });
    },
  },
  getters: {
    isAuthorized({ auth }) {
      return auth.user_id && auth.token ? auth : false;
    },
    getCurrentUser({ user }) {
      return user;
    },
  },
};
