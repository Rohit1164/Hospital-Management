import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`);
    console.log("MONGODB connected");
  } catch (error) {
    throw new Error(`MONGODB connection error: ${error.message}`);
  }
};

export default connectDB;
