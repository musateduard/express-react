import dotenv from "dotenv";
import express from "express";
import type { Express } from "express";
import { connectDB } from "./database.js";
import { itemsRouter } from "./items/item.controller.js";


dotenv.config();

const app: Express = express();
const PORT: number = 3000;

connectDB();

app.use(express.json());
app.use("/items", itemsRouter);


app.listen(

    PORT,

    (): void => {
        console.log("server started");
        return;
    }
);