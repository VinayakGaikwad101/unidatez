import express from "express";
import { protectRoute } from "../middleware/ProtectRoute.js";
import { updateProfile } from "../controllers/User.js";

const router = express.Router();

router.put("/update", protectRoute, updateProfile); // http://localhost:3000/api/users/update

export default router;
