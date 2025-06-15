import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { User } from "../models";
const secret = process.env.JWT_SECRET || "";

export interface AuthenticatedRequest extends Request {
  user?: Pick<User, "id" | "username">;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log({token, secret})

  if (!token) {
    res.status(401).json({ message: "Missing token" });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret) as any;
    req.user = { id: decoded.userId, username: decoded.username };
    next();
  } catch (err) {
    console.log(err)
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
