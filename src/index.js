import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
app.use(cors());
app.use(json());

const PORT = process.env.Port || 5000;
app.listen(PORT, () => console.log("server running"));
