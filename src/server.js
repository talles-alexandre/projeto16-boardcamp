import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import categoryRouter from "./routes/categoryRouter.js";
import gameRouter from "./routes/gameRouter.js";
import customerRouter from "./routes/customerRouter.js";
import rentalsRouter from "./routes/rentalsRouter.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(json());

app.use(categoryRouter);
app.use(gameRouter);
app.use(customerRouter);
app.use(rentalsRouter);

app.listen(4000, () => console.log("server running"));
