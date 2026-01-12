import dotenv from "dotenv";
import express from "express";
import type { Express } from "express";
import { itemsRouter } from "./items/controller.js";


dotenv.config();

const app: Express = express();
const PORT: number = 3000;

app.use(express.json());
app.use("/api/items", itemsRouter);


app.listen(

    PORT,

    (): void => {
        console.log("server started");
        return;
    }
);