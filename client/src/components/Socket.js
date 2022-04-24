import React from 'react';
import { io } from "socket.io-client";
import socketio from "socket.io-client";
import { SOCKET_URL } from "./config";



export  function Connect () {

// send a message to the server
socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

// receive a message from the server
socket.on("hello from server", (...args) => {
  // ...
});
}
export const SocketContext = React.createContext();
export const socket = socketio.connect(io(SOCKET_URL));
