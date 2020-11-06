import { createSocket } from "vue-socket.io-next";

export default createSocket({
  debug: true,
  connection: "http://192.168.0.16:5000",
});
