import mongoose, { Mongoose } from "mongoose";


export async function connectDB(): Promise<void> {

    try {

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