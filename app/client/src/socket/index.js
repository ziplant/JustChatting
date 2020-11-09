import { createSocket } from "vue-socket.io-next";

export default createSocket({
  debug: true,
  connection: "http://localhost:5000",
});
