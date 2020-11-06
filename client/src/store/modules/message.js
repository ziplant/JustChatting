export default {
  state: {
    messages: [],
  },
  mutations: {
    updateMessages(state, data) {
      state.messages = data;
    },
    pushMessage(state, data) {
      state.messages.push(data);
    },
  },
  actions: {
    async fetchMessages({ commit, getters }, { group, limit = 100 }) {
      return await fetch(`/api/message/${group}/?_limit=${limit}`, {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "auth-token": getters.isAuthorized.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            commit("updateMessages", data);
          }

          return data;
        });
    },
    async createMessage({ commit, getters }, message) {
      return await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "auth-token": getters.isAuthorized.token,
        },
        body: JSON.stringify(message),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            commit("pushMessage", data);
          }
          return data;
        });
    },
  },
  getters: {
    getMessages: ({ messages }) => (limit) => {
      return messages;
    },
  },
};
