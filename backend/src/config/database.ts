import { readFileSync } from "fs";
import mongoose, { Mongoose } from "mongoose";


export async function connectDB(): Promise<void> {

    const usernamePath: string | undefined = process.env.DB_USER_NAME_FILE;
    const passwordPath: string | undefined = process.env.DB_USER_PASS_FILE;
    const databaseName: string | undefined = process.env.DB_NAME;
    const host: string | undefined = process.env.DB_HOST;
    const port: string | undefined = process.env.DB_PORT;

    try {

        // const username: string = readFileSync(`${usernamePath}`, "utf-8").trim();
        // const password: string = readFileSync(`${passwordPath}`, "utf-8").trim();
        // const url: string = `mongodb://${username}:${password}@${host}:${port}/${databaseName}`;
        const url: string = `${process.env.MONGO_URI}`;

        const connection: Mongoose = await mongoose.connect(url);
        console.log("database connected successfully");
    }

    catch (error) {

        console.warn("failed to connect to database");
        console.error(error);

        process.exit(1);
    }

    return;
}