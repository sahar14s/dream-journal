import { Express, Router } from "express";
import {
  createNewUser,
  loginUser,
  userInfo,
} from "../controllers/AuthController";
import { authMiddleware } from "../middleware/Auth";

const router = Router();

router.post("/auth/register", createNewUser);
router.post("/auth/login", loginUser);
router.get("/auth/verify", authMiddleware, (req, res) => {
  res.status(200).json({ message: "User is authenticated" });
});
router.get("/auth/user/:id", authMiddleware, userInfo);
export default router;
