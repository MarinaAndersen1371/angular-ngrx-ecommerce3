import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`.bold.cyan);
  } catch (error) {
    console.error(`Error: ${error.message}`.bold.red);
    process.exit(1);
  }
};

export default connectDB;
