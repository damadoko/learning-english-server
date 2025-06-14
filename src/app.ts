import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { authRoutes, chatRoutes } from "./routes";
import sequelize from "./db";
import "./models";

dotenv.config();
const PORT = process.env.PORT || 3001;

const app = express();

sequelize.sync().then(() => {
  console.log("✅ Connected to database");
  app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
  });
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

export default app;
