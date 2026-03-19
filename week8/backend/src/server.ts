
import app from "./app";
import { connectDB } from "./config/db";
import { ENV } from "./config/env";
import fs from "fs";
import path from "path";
import http from "http";
import { verifyToken } from "./utils/jwt";
import { initializeSocket, addOnlineUser, removeOnlineUser } from "./socket";
import { User } from "./models/User";

const startServer = async () => {
  try {
    const uploadsPath = path.join(__dirname, "..", "uploads");

    if (!fs.existsSync(uploadsPath)) {
      fs.mkdirSync(uploadsPath);
    }

    await connectDB();

    const httpServer = http.createServer(app);

    const io = initializeSocket(httpServer);

    io.use((socket, next) => {
      try {
        let token: string | undefined;

        if (typeof socket.handshake.auth?.token === "string") {
          token = socket.handshake.auth.token;
        }         
        const authHeader = socket.handshake.headers.authorization;

        if (!token && typeof authHeader === "string") {
          if (authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
          }
        }
        
        if (!token) {
          return next(new Error("Unauthorized"));
        }

        const decoded = verifyToken(token);
        socket.data.userId = decoded.userId;

        next();
      } catch (error) {
        next(new Error("Unauthorized"));
      }
    });

io.on("connection", (socket) => {
  const userId: string = socket.data.userId;

  console.log(`User connected: ${userId}`);

  socket.join(userId);

  socket.on("join_groups", (groupIds: string[]) => {
    groupIds.forEach((groupId) => {
      socket.join(groupId);
    });
  });

  addOnlineUser(userId, socket.id);

  socket.on("typing", ({ receiverId }) => {
    socket.to(receiverId).emit("typing", {
      senderId: userId,
    });
  });

  socket.on("stop_typing", ({ receiverId }) => {
    socket.to(receiverId).emit("stop_typing", {
      senderId: userId,
    });
  });

  socket.on("disconnect", async () => {
    removeOnlineUser(userId, socket.id);

    await User.findByIdAndUpdate(userId, {
      lastSeen: new Date(),
    });

    console.log(`User disconnected: ${userId}`);
  });
});

  httpServer.listen(ENV.PORT, () => {
      console.log(`Server running on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
