export default {
  actions: {
    async fetchMessages({ commit }, { group, token, limit = 100 }) {
      return await fetch(`/api/message/${group}/?_limit=${limit}`, {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "auth-token": token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) commit("updateMessages", data);
          return data.error;
        });
    },
    async createMessage({ dispatch }, { message, token }) {
      return await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "auth-token": token,
        },
        body: JSON.stringify(message),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            dispatch("fetchMessages", {
              group: message.group_id,
              token: token,
            });
          }
          return data.error;
        });
    },
  },
  mutations: {
    updateMessages(state, data) {
      state.messages = data;
    },
    SOCKET_pushMessage(state, data) {
      state.messages.unshift(data);
    },
  },
  state: {
    messages: [],
  },
  getters: {
    getMessages({ messages }, limit) {
      return messages;
    },
  },
};
