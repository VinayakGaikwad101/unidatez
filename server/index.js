import express from "express";
import connectToMongoDB from "./db/mongodb.js";
import dotenv from "dotenv";
import preLaunchRouter from "./routes/PreLaunchRoute.js";
import cors from "cors";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();
const app = express();
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
app.use(express.json());

app.use("/api/pre-register", preLaunchRouter); // http://localhost:3000/api/pre-register/save/email

connectToMongoDB();

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
