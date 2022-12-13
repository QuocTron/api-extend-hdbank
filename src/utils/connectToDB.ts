import mongoose from "mongoose";
import log from "./logger";

async function connectToDb() {
  const dbUri = process.env.MONGODB_URL;
  try {
    await mongoose.connect(dbUri as string);
    log.info("Connected to database");
  } catch (error) {
    process.exit(1);
  }
}

export default connectToDb;
