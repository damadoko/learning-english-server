import { Router } from "express";
import { authMiddleware } from "../middleware/authenticate";
import {
  executeLogin,
  executeRegister,
  selfAuth,
} from "../controllers/auth.controller";

const router = Router();

router.get("/", authMiddleware, selfAuth);
router.post("/login", executeLogin);
router.post("/register", executeRegister);

export default router;
