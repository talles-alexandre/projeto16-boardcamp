import { Router } from "express";
import {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
} from "../controllers/customerController.js";
import { validateCustomer } from "../middlewares/customerValidator.js";

const router = Router();
router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomer);
router.post("/customers", validateCustomer, createCustomer);
router.put("/customers/:id", validateCustomer, updateCustomer);

export default router;
