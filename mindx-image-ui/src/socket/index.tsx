import { io } from "socket.io-client";

const socketClient = io(import.meta.env.VITE_SOCKET_SERVER, {
  autoConnect: false,
  auth: {
    token: localStorage.getItem("token"),
  },
});

export default socketClient;
