import mongoose, { Document, Schema } from "mongoose";

export interface Idream extends Document {
  userId: string;
  title: string;
  content: string;
  date: Date;
  clarity: number;
  mood: string;
  tags: string;
  isFavorite: boolean;
  createAt: Date;
  updateAt: Date;
}

const dreamSchema = new Schema({
  userId: { type: String, require: true },
  title: { type: String, require: true, maxlength: 100 },
  content: { type: String, require: true, maxlength: 5000 },
  date: { type: Date, require: true },
  clarity: { type: Number, require: true, min: 1, max: 5 },
  mood: {
    type: String,
    require: true,
    enum: [
      "Happy",
      "Sad",
      "Angry",
      "Fearful",
      "Confused",
      "Excited",
      "Neutral",
    ],
  },
  tags: { type: String, require: false, maxlength: 200 },
  isFavorite: { type: Boolean, default: false },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});
export const DreamModel = mongoose.model<Idream>("Dream", dreamSchema);
