import React from "react";
import { io, Socket } from "socket.io-client";

export const socket = io("http://localhost:3080", {
  reconnection: false,
  reconnectionAttempts: 3,
});

export const SocketContext = React.createContext<Socket>(socket);
