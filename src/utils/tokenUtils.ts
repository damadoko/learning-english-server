import jwt from "jsonwebtoken";
import { User } from "../models";

export const genToken = (user: User) => {
  return jwt.sign(
    {
      userId: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "1Hour" }
  );
};
