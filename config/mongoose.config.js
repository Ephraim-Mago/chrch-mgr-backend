import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Mongoose Database connected successfully");
  } catch (err) {
    console.log("Mongoose Database connection failed", err.message);
    process.exit(1);
  }
};

export default connectDatabase;
