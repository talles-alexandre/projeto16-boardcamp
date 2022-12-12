import { Router } from "express";
import { getGame, createGame } from "../controllers/gameController.js";
import { validateGame } from "../middlewares/gameValidator.js";

const router = Router();
router.get("/games", getGame);
router.post("/games", validateGame, createGame);

export default router;
