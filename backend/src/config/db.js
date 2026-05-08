const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is not set in environment variables.");
  }

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 8000,
  });
  console.log("MongoDB connected");
};

module.exports = connectDB;

console.log("Using Mongo URI:", process.env.MONGO_URI);

