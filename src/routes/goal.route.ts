import express from "express";
import { requireAuthMiddleware } from "../middlewares/require-auth.middleware";
import * as goalController from "../controllers/goal.controller";
import { validate } from "../middlewares/validate.middleware";
import { createGoalSchema, updateGoalSchema } from "../validation/goal.schema";

const router = express.Router();

router.use(requireAuthMiddleware);

router.post("/", validate(createGoalSchema), goalController.createGoal);
router.get("/", goalController.getGoals);
router.put("/:id", validate(updateGoalSchema), goalController.updateGoal);
router.delete("/:id", goalController.deleteGoal);

export default router;
