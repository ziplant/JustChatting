import Vue from "vue";
import VueSocketIO from "vue-socket.io";
import store from "../store";

export default new VueSocketIO({
  debug: false,
  connection: "http://192.168.0.16:5000",
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_",
  },
});
