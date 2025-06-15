import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { AuthenticatedRequest } from "../middleware/authenticate";
import { genToken } from "../utils/tokenUtils";
import { User } from "../models";

export const selfAuth = async (req: AuthenticatedRequest, res) => {
  const user = req?.user;
  res.json({
    success: true,
    user,
  });
};

export const executeLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Missing email or password" });
    return;
  }
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      res
        .status(401)
        .json({ success: false, error: { message: "User not found" } });
      return;
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res
        .status(401)
        .json({ success: false, error: { message: "Invalid password" } });
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
    res
      .status(500)
      .json({ success: false, error: { message: "server error" } });
  }
};

export const executeRegister = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      success: false,
      error: { message: "Missing email or password" },
    });
    return;
  }

  try {
    const existing = await User.findOne({ where: { username } });
    if (existing) {
      res
        .status(400)
        .json({ success: false, error: { message: "Username already used" } });
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
    res
      .status(500)
      .json({ success: false, error: { message: "Registration failed" } });
  }
};
