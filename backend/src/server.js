const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const logsRouter = require("./routes/logs");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "*",
}));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Toll Plaza API running" });
});

app.use("/logs", logsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

connectDB().catch((error) => {
  console.error("Database connection failed:", error.message);
  process.exit(1);
});

module.exports = app;
