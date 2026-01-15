import dotenv from "dotenv";
import express from "express";
import type { Express } from "express";
import cors, { type CorsOptions } from "cors";

import { connectDB } from "./config/database.js";
import { itemsRouter } from "./items/item.controller.js";


dotenv.config();

const app: Express = express();
const PORT: number = 3000;

connectDB();

const corsOptions: CorsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/items", itemsRouter);


app.listen(

    PORT,

    (): void => {
        console.log("server started");
        return;
    }
);