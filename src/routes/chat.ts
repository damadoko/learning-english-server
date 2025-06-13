import { Response, Router } from "express";

import { Message } from "../models";
import {
  AuthenticatedRequest,
  authenticateToken,
} from "../middleware/authenticate";
import { sendMessageToChatGPT } from "../utils/openAIUtils";

const router = Router();
router.use(authenticateToken);

router.get("/history", async (req: AuthenticatedRequest, res: Response) => {
  try {
    console.log(req.user);
    const messages = await Message.findAll({
      where: { userId: req.user?.id },
    });
    console.log(messages);
    if (!messages) {
      return;
    }
    res.status(200).json({ error: "server error" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

router.post("/send", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;

    if (!message) {
      res.status(400).json({ error: "Missing message" });
      return;
    }

    await Message.create({ userId, role: "user", content: message });

    // Lấy các tin nhắn trước đó (nếu cần gửi kèm context)
    const history = await Message.findAll({
      where: { userId },
      order: [["createdAt", "ASC"]],
      limit: 10,
    });

    const chatMessages = history.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

    const reply = await sendMessageToChatGPT(message, chatMessages);
    await Message.create({ userId, role: "assistant", content: reply });

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

export default router;
