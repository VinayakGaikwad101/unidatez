import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectToMongoDB from "./db/mongodb.js";

import preLaunchRouter from "./routes/PreLaunchRoute.js";
import authRouter from "./routes/AuthRoute.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin:
      process.env.ENVIRONMENT === "production"
        ? " http://localhost:5173"
        : "https://www.unidatez.com",
    methods: "GET, POST, PUT, PATCH, DELETE",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/pre-register", preLaunchRouter); 

app.use("/api/auth", authRouter); 

connectToMongoDB();

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
