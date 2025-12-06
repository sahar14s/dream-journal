import { Express, Request, Response } from "express";
import mongoose from "mongoose";
import { DreamModel, Idream } from "../models/Dream.model";

export const getAllDreams = async (req: Request, res: Response) => {
  try {
    const dream = await DreamModel.find({});
    res.status(200).json(dream);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Dreams", error });
  }
};

export const postNewDream = async (req: Request, res: Response) => {
  try {
    const newDream = new DreamModel(req.body);
    await newDream.save();
    res.status(201).json(newDream);
  } catch (error) {
    res.status(500).json({ message: "Error Adding Dreams", error });
  }
};

export const getDreamById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const dream = await DreamModel.findById(id);
    if (!dream) {
      return res.status(404).json({ message: "Dream not found" });
    }
    res.status(200).json(dream);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Dream", error });
  }
};

export const updateDream = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedDream = await DreamModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedDream) {
      return res.status(404).json({ message: "Dream not found" });
    }
    res.status(200).json(updatedDream);
  } catch (error) {
    res.status(500).json({ message: "Error Updating Dream", error });
  }
};

export const deleteDream = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const dream = await DreamModel.findByIdAndDelete(id);

    if (!dream) {
      return res.status(404).json({ message: "Dream not found" });
    }
    res.status(200).json(dream);
  } catch (error) {
    res.status(500).json({ message: "Error Deleting Dream", error });
  }
};

export const searchDream = async (req: Request, res: Response) => {
  const { title } = req.query;
  if (!title || typeof title !== "string") {
    return res.status(400).json({ message: "Title query is required" });
  }
  try {
    const dream = await DreamModel.find({
      title: { $regex: title, $options: "i" },
    });
    console.log("searchDream | found dreams :", dream.length);
    if (!dream) {
      return res.status(404).json({ message: "Dream not found" });
    }
    res.status(200).json(dream);
  } catch (error) {
    res.status(500).json({ message: "Error Finding Dream", error });
  }
};

export const getUniqueTags = async (req: Request, res: Response) => {
  try {
    // מחזיר את כל הערכים הייחודיים שמופיעים בשדה "tags"
    const tags = await DreamModel.distinct("tags");

    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Tags", error });
  }
};

export const getAllFavorite = async (req: Request, res: Response) => {
//   const { isFavorite } = req.params;
  try {
    const dream = await DreamModel.find({
      isFavorite: true,
    });
    console.log("getAllFavorite | found dreams :", dream.length);
    res.status(200).json(dream);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Favorite Dreams", error });
  }
};
export const getAllMoods = async (req: Request, res: Response) => {
  try {
    const mood = await DreamModel.find({});
    res.status(200).json(mood);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Dreams", error });
  }
};