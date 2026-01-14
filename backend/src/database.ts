import mongoose, { Mongoose } from "mongoose";


export async function connectDB(): Promise<void> {

    const url: string = "mongodb://localhost:27017/shoppingItems";

    try {
        const connection: Mongoose = await mongoose.connect(url);
        console.log("database connected successfully");
    }

    catch (error) {

        console.warn(`failed to connect to database: ${url}`);
        console.error(error);

        process.exit(1);
    }

    return;
}