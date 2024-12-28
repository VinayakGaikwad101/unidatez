import express from "express";
import { protectRoute } from "../middleware/ProtectRoute.js";
import { getConversation, sendMessage } from "../controllers/Message.js";

const router = express.Router();

router.use(protectRoute);

router.post("/send", sendMessage);
router.get("/conversation/:userID", getConversation);

export default router;
