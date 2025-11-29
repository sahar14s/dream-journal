import { Express ,Router} from "express";
import { createNewUser, loginUser, userInfo } from "../controllers/AuthController";

const router = Router();

router.post("/auth/register`", createNewUser);
router.post("/auth/login", loginUser);
router.get("/auth/user/:id",userInfo);
export default router;
