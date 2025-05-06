import mongoose, { Schema } from "mongoose";

type GoalFields = {
  title: string;
  description?: string;
  completed: boolean;
};

export type GoalUpdateInput = Partial<GoalFields>;

export interface GoalDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const goalSchema = new Schema<GoalDocument>({
  userId:    { type: Schema.Types.ObjectId, ref: "User", required: true },
  title:     { type: String, required: true },
  description: { type: String, required: false, default: "" },
  completed: { type: Boolean, default: false },
}, {
  timestamps: true,
});

goalSchema.index({ userId: 1 });

export const Goal = mongoose.model<GoalDocument>("Goal", goalSchema);
