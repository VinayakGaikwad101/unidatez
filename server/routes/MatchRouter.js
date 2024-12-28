import express from "express";
import { protectRoute } from "../middleware/ProtectRoute.js";
import {
  blockUser,
  dislikeUser,
  getBlockProfiles,
  getDislikedUsers,
  getLikedUsers,
  getMatches,
  getUserProfiles,
  likeUser,
  unblockUser,
} from "../controllers/Match.js";

const router = express.Router();

router.post("/like/:likedUserID", protectRoute, likeUser); // http://localhost:3000/api/matches/like/:likedUserID
router.post("/dislike/:dislikedUserID", protectRoute, dislikeUser); // http://localhost:3000/api/matches/dislike/:dislikedUserID
router.post("/block/:blockUserID", protectRoute, blockUser); // http://localhost:3000/api/matches/block/:blockUserID
router.post("/unblock/:unblockUserID", protectRoute, unblockUser); // http://localhost:3000/api/matches/unblock/:unblockUserID

router.get("/", protectRoute, getMatches); // http://localhost:3000/api/matches
router.get("/liked-users", protectRoute, getLikedUsers); // http://localhost:3000/api/matches/liked-users
router.get("/disliked-users", protectRoute, getDislikedUsers); // http://localhost:3000/api/matches/disliked-users
router.get("/user-profiles", protectRoute, getUserProfiles); // http://localhost:3000/api/matches/user-profiles
router.get("/block-user-profile", protectRoute, getBlockProfiles); // http://localhost:3000/api/matches/block-user-profile

export default router;
