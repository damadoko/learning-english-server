import { Router } from "express";
import { getTranslation } from "../controllers/translate.controller";

const router = Router();

router.get("/", getTranslation);

export default router;
