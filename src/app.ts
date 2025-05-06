import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route";
import goalRoutes from "./routes/goal.route";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/auth", authRoutes);
app.use("/goals", goalRoutes);

export { app };
