import { Router } from "express";
import {
  deleteDream,
  getAllDreams,
  getAllFavorite,
  getDreamById,
  getUniqueTags,
  postNewDream,
  searchDream,
  updateDream,
} from "../controllers/DreamController";
import { getAllMoods } from "../controllers/MoodController";
import { authMiddleware } from "../middleware/Auth";

const router = Router();

// Only protect routes under the /dreams path so /api/auth/* calls don't get blocked
router.use("/dreams", authMiddleware);

router.get("/dreams", getAllDreams);
router.get("/dreams/search/title", searchDream);
router.get("/dreams/uniqueTags", getUniqueTags);
router.get("/dreams/favorites", getAllFavorite);
router.get("/dreams/mood", getAllMoods);

router.post("/dreams", postNewDream);
router.get("/dreams/:id", getDreamById);
router.patch("/dreams/:id", updateDream);
router.delete("/dreams/:id", deleteDream);

export default router;
