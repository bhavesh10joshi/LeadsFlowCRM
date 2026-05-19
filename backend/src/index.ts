import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import UserRouter from "./Routes/User/User";
import LeadRouter from "./Routes/Lead/Lead";
const envPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: envPath });

// NewComment
const app = express();
app.use(express.json());
app.use(cors());

const MongoDB_URL:any = process.env.MongoDB_URL as string;
const PORT:number = parseInt(process.env.PORT as string) || 8000;

if (!MongoDB_URL) {
    throw new Error("MongoDB_URL environment variable is missing from .env!");
}

app.use("/LeadFlow/Api/User", UserRouter);
app.use("/LeadFlow/Api/Lead", LeadRouter);

app.get("/api/health", (req, res) => {
    res.status(200).send("OK");
});

main();

async function main()
{
    try{
        await mongoose.connect(MongoDB_URL);
        app.listen(PORT, function()
        {
            console.log("Successfully listening on port " + PORT);
        });
    }
    catch(e)
    {
        console.log("Error Occurred while listening!");
        return;
    }
}
