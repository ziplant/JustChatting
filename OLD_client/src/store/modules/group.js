export default {
  actions: {
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
          return data.error;
        });
    },
    async fetchGroupById({ commit }, data) {
      return await fetch(`/api/group/${data.id}`, {
        method: "GET",
        headers: {
          "auth-token": data.token,
          "Content-Type": "applciation/json;charset=utf-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            commit("updateCurrentGroup", data);
          }
          return data.error;
        });
    },
  },
  mutations: {
    updateGroups(state, data) {
      state.groups = data;
    },
    updateCurrentGroup(state, data) {
      state.currentGroup = data;
    },
  },
  state: {
    groups: [],
    currentGroup: {},
  },
  getters: {
    getGroups({ groups }) {
      return groups;
    },
    getCurrentGroup: (state) => (id) => {
      return state.groups.find((el) => el.group_id == id);
    },
  },
};
