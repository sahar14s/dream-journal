import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// מרחיבים את טיפוס Request כדי להכיל req.user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
