import { Response, Router } from "express";

import { Message } from "../models";
import {
  AuthenticatedRequest,
  authMiddleware,
} from "../middleware/authenticate";
import { sendMessageToChatGPT } from "../utils/openAIUtils";

const router = Router();

router.get(
  "/history",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user?.id) {
        res.status(200).json({ success: true, messages: [] });
        return;
      }
      const messages = await Message.findAll({
        where: { userId: req.user?.id },
      });
      if (!messages) {
        return;
      }
      res.status(200).json({ success: true, messages });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, error: { message: "server error" } });
    }
  }
);

router.post(
  "/send",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    let userMessageId = null;
    try {
      const { message } = req.body;
      const userId = req.user.id;

      if (!message) {
        res
          .status(400)
          .json({ success: false, error: { message: "Missing message" } });
        return;
      }

      const userMessage = await Message.create({
        userId,
        role: "user",
        content: message,
      });
      userMessageId = userMessage.id;

      const history = await Message.findAll({
        where: { userId },
        order: [["createdAt", "ASC"]],
        limit: 5,
      });

      const histories = history.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

      const reply = await sendMessageToChatGPT({ message, histories });
      const replyMessage = await Message.create({
        userId,
        role: "assistant",
        content: reply,
      });

      res.json({ success: true, messages: [replyMessage] });
    } catch (error) {
      console.error(error);
      if (userMessageId) {
        await Message.destroy({ where: { id: userMessageId } });
      }
      res.status(500).json({ success: false, error: "server error" });
    }
  }
);

router.post("/guest-send", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      res
        .status(400)
        .json({ success: false, error: { message: "Missing message" } });
      return;
    }
    const reply = await sendMessageToChatGPT({ message });
    const replyMessage = {
      userId: "",
      role: "assistant",
      content: reply,
    };
    res.json({ success: true, messages: [replyMessage] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "server error" });
  }
});

export default router;
