import Joi from "joi";

export const createGoalSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  description: Joi.string().max(500).optional(),
});

export const updateGoalSchema = Joi.object({
  title: Joi.string().min(1).max(100).optional(),
  description: Joi.string().max(500).optional(),
  completed: Joi.boolean().optional(),
});
