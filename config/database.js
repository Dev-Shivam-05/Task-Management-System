import mongoose from "mongoose";
import envConfig from "./envConfig.js";

const db = async () => {
    try {
        await mongoose.connect(envConfig.MONGODB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default db();