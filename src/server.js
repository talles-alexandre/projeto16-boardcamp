import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import categoryRouter from "./routes/categoryRouter.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(json());

app.use(categoryRouter);

app.listen(4000, () => console.log("server running"));
