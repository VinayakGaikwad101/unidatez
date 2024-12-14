import express from "express";
import connectToMongoDB from "./db/mongodb.js";
import dotenv from "dotenv";
import preLaunchRouter from "./routes/PreLaunchRoute.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(
  cors({
    origin: "https://www.unidatez.com",
    methods: "GET, POST, PUT, PATCH, DELETE",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/pre-register", preLaunchRouter); // http://localhost:3000/api/pre-register/save/email

connectToMongoDB();

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
