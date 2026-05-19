import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import UserRouter from "./Routes/User/User";
import LeadRouter from "./Routes/Lead/Lead";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const MongoDB_URL = process.env.MongoDB_URL as string;

if (!MongoDB_URL) {
    throw new Error("MongoDB_URL environment variable is missing!");
}

mongoose.connect(MongoDB_URL).catch(err => console.log("DB Error:", err));

app.use("/LeadFlow/Api/User", UserRouter);
app.use("/LeadFlow/Api/Lead", LeadRouter);

app.get("/api/health", (req, res) => {
    res.status(200).send("OK");
});

export default app;