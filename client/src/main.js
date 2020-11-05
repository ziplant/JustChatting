import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import socket from "./socket";
import "materialize-css";
import "materialize-css/dist/css/materialize.css";
import "material-design-icons/iconfont/material-icons.css";

createApp(App)
  .use(store)
  .use(socket)
  .use(router)
  .mount("#app");
