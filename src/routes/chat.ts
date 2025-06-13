import { Response, Router } from "express";
import bcrypt from "bcrypt";

import { Message } from "../models";
import {
  AuthenticatedRequest,
  authenticateToken,
} from "../middleware/authenticate";

const router = Router();

router.get(
  "/history",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
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
  }
);

export default router;
