import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // load .env variables

const MONGODB_URL = process.env.MONGODB_URL;

export const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1); // stop server if DB connection fails
  }
};
