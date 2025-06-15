import { Router } from "express";

import { authMiddleware } from "../middleware/authenticate";
import {
  getChatHistory,
  sendChatMessage,
  sendGuestMessage,
} from "../controllers/chat.controller";

const router = Router();

router.get("/history", authMiddleware, getChatHistory);
router.post("/send", authMiddleware, sendChatMessage);
router.post("/guest-send", sendGuestMessage);

export default router;
