import React from 'react';
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


export const socket = socketio.connect(SOCKET_URL);
export const SocketContext = React.createContext();