import { Router } from "express";
import bcrypt from "bcrypt";

import { User } from "../models";
import { genToken } from "../utils/tokenUtils";

const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Missing email or password" });
    return;
  }
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }

    const token = genToken(user);
    res.json({
      success: true,
      token,
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: "Missing email or password" });
    return;
  }

  try {
    const existing = await User.findOne({ where: { username } });
    if (existing) {
      res.status(400).json({ error: "Username already used" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      user: {
        id: newUser.id,
        username: newUser.username,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

export default router;
