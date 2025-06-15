import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { authRoutes, chatRoutes, translateRoutes } from "./routes";
import sequelize from "./db";
import "./models";

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
app.use("/api/translate", translateRoutes);

export default app;
