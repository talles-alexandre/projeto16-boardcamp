import { Router } from "express";
import {
  getCategories,
  createCategories,
} from "../controllers/categoryController.js";
import { validateCategory } from "../middlewares/categoryValidator.js";

const router = Router();
router.get("/categories", getCategories);
router.post("/categories", validateCategory, createCategories);

export default router;
