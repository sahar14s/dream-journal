import { Express, Request, Response} from "express";
import mongoose from "mongoose";
import { Imood, MoodModel} from "../models/Moods.model";

export const getAllMoods = async (req: Request, res: Response) => {
  try {
    const moods = await MoodModel.find({});
    res.status(200).json(moods);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Moods", error });
  }
};

export const postNewMood = async (req: Request, res: Response) => {
  try {
    const newMood = new MoodModel(req.body);
    await newMood.save();
    res.status(201).json(newMood);
  } catch (error) {
    res.status(500).json({ message: "Error Adding Mood", error });
  }
};