import express from "express";

import { 
  register, 
  verifyEmail, 
  login, 
  logout,
  forgotPassword,
  resetPassword 
} from "../controllers/Auth.js";
import { protectRoute } from "../middleware/ProtectRoute.js";
// import { verifiedUser } from "../middleware/VerifiedUser.js";

const router = express.Router();

router.post("/register", register); // http://localhost:3000/api/auth/register
router.post("/verify-email", verifyEmail); // http://localhost:3000/api/auth/verify-email
router.post("/login", login); // http://localhost:3000/api/auth/login
router.post("/logout", logout); // http://localhost:3000/api/auth/logout
router.post("/forgot-password", forgotPassword); // http://localhost:3000/api/auth/forgot-password
router.post("/reset-password", resetPassword); // http://localhost:3000/api/auth/reset-password
router.get("/me", protectRoute, (req, res) => {
  res.status(200).json({
    message: "User data retrieved successfully",
    success: true,
    user: req.user,
  });
}); // http://localhost:3000/api/auth/me

export default router;
