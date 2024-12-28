import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";
import dotenv from "dotenv";
dotenv.config();

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        message: "Not authorized - No token provided",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        message: "Not authorized - Invalid token",
        success: false,
      });
    }

    const currentUser = await User.findById(decoded.id);

    // protected routes can access current user by await User.findById(req.user.id)
    req.user = currentUser;

    next();
  } catch (error) {
    console.error("Error in protectRoute middleware");
    if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .json({ message: "Not authorized - Invalid token", success: false });
    } else {
      return res.status(500).json({ message: "Server error", success: false });
    }
  }
};
