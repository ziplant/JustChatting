export default {
  state: {
    authoried: false,
  },
  mutations: {
    login(state) {
      state.authoried = true;
    },
    logout(state) {
      state.authorized = false;
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
        .then((data) => data);
    },
    async registry({ commit }, form) {
      return await fetch("/api/user", {
        method: "POST",
        body: new FormData(form),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            commit("login");
          }
          return data;
        });
    },
    verify() {},
  },
  getters: {
    isAuthorized(state) {
      return state.authoried;
    },
  },
};
