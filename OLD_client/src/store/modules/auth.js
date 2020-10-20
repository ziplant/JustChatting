import router from "../../router";
export default {
  actions: {
    async login({ commit, dispatch }, user) {
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
            localStorage.setItem("token", data.message);
            localStorage.setItem("user", data.user_id);
            dispatch("fetchGroups", data.message);
            commit("login");
          }
          return data;
        });
    },
    checkToken({ commit }) {
      if (localStorage.getItem("token")) commit("login");
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      commit("logout");
      if (router.history.current.path != "/") router.push("/");
    },
    async register({ commit }, form) {
      return await fetch("/api/user", {
        method: "POST",
        body: new FormData(form),
      })
        .then((res) => res.json())
        .then((data) => {
          return data;
        });
    },
  },
  mutations: {
    login(state, id) {
      state.authorized = true;
    },
    logout(state) {
      state.authorized = false;
    },
  },
  state: {
    authorized: false,
  },
  getters: {
    isAuthorized({ authorized }) {
      return authorized;
    },
  },
};
