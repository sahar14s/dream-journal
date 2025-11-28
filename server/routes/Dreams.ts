import { Router } from "express";
import { deleteDream, getAllDreams, getAllFavorite, getDreamById, getUniqueTags, postNewDream, searchDream, updateDream } from "../controllers/DreamController";


const router = Router();
router.get("/dreams", getAllDreams);
router.get("/dreams/search/title",searchDream);
router.get("/dreams/uniqueTags",getUniqueTags);
router.get("/dreams/favorites",getAllFavorite);
router.post("/dreams", postNewDream);
router.get("/dreams/:id", getDreamById);
router.patch("/dreams/:id",updateDream );
router.delete("/dreams/:id",deleteDream);
export default router;
