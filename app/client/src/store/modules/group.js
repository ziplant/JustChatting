export default {
  state: {
    groups: [],
    currentGroup: {},
    online: {},
  },
  mutations: {
    updateGroups(state, data) {
      state.groups = data;
    },
    updateCurrentGroup(state, data) {
      state.currentGroup = data;
    },
    setOnline(state, data = {}) {
      state.online = data;
      state.groups.forEach((el) => {
        el.online = state.online[el.group_id] || 0;
      });
    },
  },
  actions: {
    async createGroup({ getters }, form) {
      return await fetch("/api/group", {
        method: "POST",
        headers: {
          "auth-token": getters.isAuthorized.token,
        },
        body: new FormData(form),
      })
        .then((res) => res.json())
        .then((data) => data);
    },
    async fetchGroups({ commit, getters }) {
      return await fetch("/api/group", {
        method: "GET",
        headers: {
          "auth-token": getters.isAuthorized.token,
          "Content-Type": "applciation/json;charset=utf-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            commit("updateGroups", data);
            commit("setOnline", getters.getOnline);
          }
          return data;
        });
    },
    async fetchGroupById({ commit, getters }, groupId) {
      return await fetch(`/api/group/${groupId}`, {
        method: "GET",
        headers: {
          "auth-token": getters.isAuthorized.token,
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
    getGroups: ({ groups }) => (search) => {
      return groups.filter((el) =>
        el.title.toLowerCase().includes(search.value.toLowerCase())
      );
    },
    getCurrentGroup({ currentGroup }) {
      return currentGroup;
    },
    getOnline({ online }) {
      return online;
    },
    getGroupOnline: ({ online }) => (group_id) => {
      return online[group_id];
    },
  },
};
