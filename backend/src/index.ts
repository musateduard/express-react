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

    origin: (origin: string | undefined, callback): void => {

        const originList: string[] = process.env.ALLOWED_ORIGINS?.split(",") || [];

        if ( !origin || originList.includes(origin) ) {
            callback(null, true);
        }

        else {
            callback(new Error(`origin not allowed ${origin}`));
        }

        return;
    },

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