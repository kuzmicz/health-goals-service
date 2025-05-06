import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export async function register(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    await authService.registerUser(email, password);
    res.status(201).json({ message: "Registered" });
  } catch (error) {

    res.status(400).json({ error: "Registration failed" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const token = await authService.loginUser(email, password);
    res.json({ token });
  } catch {
    res.status(401).json({ error: "Invalid credentials" });
  }
}
