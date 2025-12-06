import mongoose from "mongoose";

export interface Imood extends mongoose.Document {
  name: string;
  description: string;
}

const moodSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false },
});

export const MoodModel = mongoose.model<Imood>("Mood", moodSchema);