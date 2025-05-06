import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config";

export async function registerUser(email: string, password: string) {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("User already exists");
  }

  const hash = await bcrypt.hash(password, 10);
  await User.create({ email, password: hash });
}

export async function loginUser(
  email: string,
  password: string,
): Promise<string> {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }
  return jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: "1h" });
}
