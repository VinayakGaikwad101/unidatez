import express from "express";

import { register, verifyEmail } from "../controllers/Auth.js";

const router = express.Router();

router.post("/register", register); // http://localhost:3000/api/auth/register
router.post("/verify-email", verifyEmail); // http://localhost:3000/api/auth/verify-email

export default router;
