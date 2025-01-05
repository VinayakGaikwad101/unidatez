import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

let io;
const connectedUsers = new Map();

export const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin:
        process.env.ENVIRONMENT === "production"
          ? "http://localhost:5173"
          : "https://www.unidatez.com",
      credentials: true,
    },
  });

  // Middleware for authentication of socket connections
  io.use((socket, next) => {
    const userId = socket.handshake.auth.userId;
    if (!userId) {
      console.log("Invalid userID");
      return next(new Error("Invalid userID"));
    }

    socket.userId = userId;
    next();
  });

  io.on("connection", (socket) => {
    console.log(`User connected, socketID: ${socket.id}`);
    connectedUsers.set(socket.userId, socket.id);

    socket.on("disconnect", () => {
      console.log(`User disconnected, socketID: ${socket.id}`);
      connectedUsers.delete(socket.userId);
    });
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

export const getConnectedUsers = () => connectedUsers;
