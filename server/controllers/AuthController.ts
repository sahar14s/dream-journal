import mongoose from "mongoose";
import { Express, Request, Response } from "express";
import { UserModel } from "../models/User.model";
import jwt from "jsonwebtoken";

export const createNewUser = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    const newUser = new UserModel({ email, password, name });
    await newUser.save();

    const userToSend = newUser.toObject();
    delete userToSend.password;

    res.status(201).json(userToSend);
  } catch (error) {
    res.status(500).json({ message: "Error Creating User", error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // בפיתוח: false, בפרודקשן: true (HTTPS)
        sameSite: "lax", // בפיתוח אפשר lax, בפרודקשן strict
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Login successful",
        // אפשר להחזיר גם מידע על המשתמש:
        user: { id: user._id, email: user.email, name: user.name },
      });
    console.log("login success");
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

export const userInfo = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user info", error });
  }
};
