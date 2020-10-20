import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import user from "./modules/user";
import group from "./modules/group";
import message from "./modules/message";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    user,
    group,
    message,
  },
});
