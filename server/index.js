import express from "express";
import connectToMongoDB from "./db/mongodb.js";
import dotenv from "dotenv";
import preLaunchRouter from "./routes/PreLaunchRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

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

app.use("/api/pre-register", preLaunchRouter); // http://localhost:3000/api/pre-register/save/email

// Serve static files from the dist folder
app.use(express.static("dist"));

// Catch-all route to serve index.html
app.get("*", (req, res) => {
  res.sendFile("dist/index.html");
});

connectToMongoDB();

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
