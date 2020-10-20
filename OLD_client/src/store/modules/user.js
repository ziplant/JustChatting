export default {
  actions: {
    async fetchUserById({ commit }, { id, token }) {
      return await fetch(`/api/user/${id}`, {
        method: "GET",
        headers: {
          "auth-token": token,
          "Content-Type": "applciation/json;charset=utf-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            commit("updateCurrentUser", data);
          }
          return data.error;
        });
    },
  },
  mutations: {
    updateCurrentUser(state, data) {
      state.currentUser = data;
    },
  },
  state: {
    currentUser: {},
  },
  getters: {
    getCurrentUser({ currentUser }) {
      return currentUser;
    },
  },
};
