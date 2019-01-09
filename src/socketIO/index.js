import SocketClient from "socket.io-client";

export const socket = SocketClient("http://localhost:3000/post");
