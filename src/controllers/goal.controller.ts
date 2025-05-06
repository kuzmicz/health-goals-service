import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/require-auth.middleware";
import * as goalService from "../services/goal.service";

export async function createGoal(req: AuthenticatedRequest, res: Response) {
  try {
    const { title, description } = req.body;
    const goal = await goalService.createGoal(req.userId!, title, description);
    res.status(201).json(goal);
  } catch (err: any) {
    console.error("Create goal error:", err);
    res.status(500).json({ error: "Failed to create goal" });
  }
}

export async function getGoals(req: AuthenticatedRequest, res: Response) {
  try {
    const goals = await goalService.getGoals(req.userId!);
    res.json(goals);
  } catch (err: any) {
    console.error("Get goals error:", err);
    res.status(500).json({ error: "Failed to fetch goals" });
  }
}

export async function updateGoal(req: AuthenticatedRequest, res: Response) {
  try {
    const updated = await goalService.updateGoal(
      req.userId!,
      req.params.id,
      req.body,
    );
    if (!updated) {
      res.status(404).json({ error: "Goal not found" });
      return;
    }
    res.status(200).json(updated);
  } catch (err: any) {
    console.error("Update goal error:", err);
    res.status(500).json({ error: "Failed to update goal" });
  }
}

export async function deleteGoal(req: AuthenticatedRequest, res: Response) {
  try {
    const deleted = await goalService.deleteGoal(req.userId!, req.params.id);
    if (!deleted) {
      res.status(404).json({ error: "Goal not found" });
      return;
    }
    res.status(200).json({ message: "Goal deleted" });
  } catch (err: any) {
    console.error("Delete goal error:", err);
    res.status(500).json({ error: "Failed to delete goal" });
  }
}
