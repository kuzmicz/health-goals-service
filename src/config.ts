import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || "mongodb://root:root@localhost:27018",
  jwtSecret: process.env.JWT_SECRET || "secret",
};
