import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";

export function validate(schema: Joi.ObjectSchema): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res
        .status(400)
        .json({ error: error.details.map((d) => d.message).join(", ") });
      return;
    }
    next();
  };
}
