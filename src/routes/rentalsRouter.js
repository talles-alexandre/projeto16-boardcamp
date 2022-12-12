import { Router } from "express";
import {
  getRentals,
  createRental,
  finishRental,
  deleteRental,
} from "../controllers/rentalController.js";
import { validateRental } from "../middlewares/rentalValidator.js";

const router = Router();
router.get("/rentals", getRentals);
router.post("/rentals", validateRental, createRental);
router.post("/rentals/:id/return", finishRental);
router.delete("/rentals/:id", deleteRental);

export default router;
