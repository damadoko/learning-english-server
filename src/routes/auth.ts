import { Router } from "express";

const router = Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Mock logic (replace with real db query later)
  if (email && password) {
    res.json({ success: true, user: { email }, token: "mock-token" });
  }

  res.status(400).json({ error: "Missing fields" });
});

export default router;
