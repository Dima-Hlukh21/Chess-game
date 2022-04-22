
import socketio from "socket.io-client";



const socket = new WebSocket("ws://localhost:3000");

socket.addEventListener("open", () => {
  // send a message to the server
  socket.send(JSON.stringify({
    type: "hello from client",
    content: [ 3, "4" ]
  }));
});


  

export const SOCKET_URL = socketio.connect(SOCKET_URL);
