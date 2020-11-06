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
    async fetchMessages(
      { commit, getters },
      data = {
        groupPassword: "",
        limit: 100,
      }
    ) {
      commit("updateMessages", []);

      return await fetch(
        `/api/message/${getters.getCurrentGroup.group_id}/?_limit=${data.limit}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "auth-token": getters.isAuthorized.token,
          },
          body: JSON.stringify({ password: data.groupPassword }),
        }
      )
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
            message.User = { username: getters.getCurrentUser.username };
            commit("pushMessage", message);
          }

          return data;
        });
    },
  },
  getters: {
    getMessages({ messages }) {
      return messages;
    },
  },
};
