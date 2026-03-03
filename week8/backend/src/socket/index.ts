
import { Server } from "socket.io";

let io: Server;

const onlineUsers = new Map<string, string>();
const messageRateMap = new Map<string, number[]>();

const MESSAGE_LIMIT = 10;
const TIME_WINDOW = 5000;

export const initializeSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

export const addOnlineUser = (userId: string, socketId: string) => {
  onlineUsers.set(userId, socketId);

  // 🔥 BROADCAST FULL ONLINE LIST
  io.emit("online_users", Array.from(onlineUsers.keys()));
};

export const removeOnlineUser = (userId: string) => {
  onlineUsers.delete(userId);

  // 🔥 BROADCAST UPDATED LIST
  io.emit("online_users", Array.from(onlineUsers.keys()));
};

export const isUserOnline = (userId: string): boolean => {
  return onlineUsers.has(userId);
};

export const canSendMessage = (userId: string): boolean => {
  const now = Date.now();

  if (!messageRateMap.has(userId)) {
    messageRateMap.set(userId, []);
  }

  let timestamps = messageRateMap.get(userId);

  if (!timestamps) {
    timestamps = [];
    messageRateMap.set(userId, timestamps);
  }

  while (timestamps.length && now - timestamps[0] > TIME_WINDOW) {
    timestamps.shift();
  }

  if (timestamps.length >= MESSAGE_LIMIT) {
    return false;
  }

  timestamps.push(now);

  return true;
};
