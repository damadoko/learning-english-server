// src/seeders/seedUsers.ts
import { User } from "../models";
import sequelize from "../db";
import bcrypt from "bcrypt";

async function seedUsers() {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synced.");

    const hashedPassword = await bcrypt.hash("123456", 10);

    await User.bulkCreate([
      {
        username: "test1",
        password: hashedPassword,
      },
      {
        username: "test2",
        password: hashedPassword,
      },
    ]);

    console.log("Seeded users successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seedUsers();
