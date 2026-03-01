
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initializeSocket = (token: string) => {
  if (socket && socket.connected) {
    return socket;
  }

  socket = io("http://localhost:5000", {
    auth: {
      token,
    },
  });

  return socket;
};

export const getSocket = (): Socket => {
  if (!socket) {
    throw new Error("Socket not initialized");
  }
  return socket;
};
