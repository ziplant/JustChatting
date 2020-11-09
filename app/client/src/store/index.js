import { createStore } from "vuex";
import user from "./modules/user";
import group from "./modules/group";
import message from "./modules/message";

export default createStore({
  modules: {
    user,
    group,
    message,
  },
});
