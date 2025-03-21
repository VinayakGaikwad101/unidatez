import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";

import connectToMongoDB from "./db/mongodb.js";

import preLaunchRouter from "./routes/PreLaunchRouter.js";
import authRouter from "./routes/AuthRouter.js";
import userRouter from "./routes/UserRouter.js";
import matchRouter from "./routes/MatchRouter.js";
import messageRouter from "./routes/MessageRouter.js";
import { initializeSocket } from "./socket/serverSocket.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const httpServer = createServer(app);

app.use(
  cors({
    origin:
      process.env.ENVIRONMENT === "production"
        ? "http://localhost:5173"
        : "https://www.unidatez.com",
    methods: "GET, POST, PUT, PATCH, DELETE",
    credentials: true,
  })
);

initializeSocket(httpServer);

app.use(express.json());
app.use(cookieParser());

app.use("/api/pre-register", preLaunchRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/matches", matchRouter);
app.use("/api/messages", messageRouter);

connectToMongoDB();

httpServer.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
