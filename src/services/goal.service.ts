import { Goal, GoalUpdateInput } from "../models/Goal";

export async function createGoal(
  userId: string,
  title: string,
  description?: string,
) {
  return Goal.create({ userId, title, description });
}

export async function getGoals(userId: string) {
  return Goal.find({ userId });
}

export async function updateGoal(
  userId: string,
  goalId: string,
  data: GoalUpdateInput,
) {
  return Goal.findOneAndUpdate({ _id: goalId, userId }, data, { new: true });
}

export async function deleteGoal(userId: string, goalId: string) {
  return Goal.findOneAndDelete({ _id: goalId, userId });
}
