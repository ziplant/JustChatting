export default {
  state: {
    groups: [],
    currentGroup: {},
  },
  mutations: {
    updateGroups(state, data) {
      state.groups = data;
    },
    updateCurrentGroup(state, data) {
      state.currentGroup = data;
    },
  },
  actions: {
    async createGroup({ commit }, { form, token }) {
      return await fetch("/api/group", {
        method: "POST",
        headers: {
          "auth-token": token,
        },
        body: new FormData(form),
      })
        .then((res) => res.json())
        .then((data) => data);
    },
    async fetchGroups({ commit }, token) {
      return await fetch("/api/group", {
        method: "GET",
        headers: {
          "auth-token": token,
          "Content-Type": "applciation/json;charset=utf-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            commit("updateGroups", data);
          }
          return data;
        });
    },
    async fetchGroupById({ commit }, { id, token }) {
      return await fetch(`/api/group/${id}`, {
        method: "GET",
        headers: {
          "auth-token": token,
          "Content-Type": "applciation/json;charset=utf-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            commit("updateCurrentGroup", data);
          }
          return data;
        });
    },
  },
  getters: {
    getGroups({ groups }) {
      return groups;
    },
    getCurrentGroup({ currentGroup }) {
      return currentGroup;
    },
  },
};
