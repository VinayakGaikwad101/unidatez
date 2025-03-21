import express from "express";
import { protectRoute } from "../middleware/ProtectRoute.js";
import { getConversation, sendMessage, getLastMessages, deleteMessage } from "../controllers/Message.js";

const router = express.Router();

router.use(protectRoute);

router.post("/send", sendMessage);
router.get("/conversation/:userID", getConversation);
router.get("/last-messages", getLastMessages);
router.delete("/:messageId", deleteMessage);

export default router;
