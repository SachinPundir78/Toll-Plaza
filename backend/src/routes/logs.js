const express = require("express");
const TollLog = require("../models/TollLog");
const { calculateTollFee } = require("../utils/feeCalculator");

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const logs = await TollLog.find().sort({ timestamp: -1 }).lean();
    return res.json(logs);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch logs", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { licensePlate, vehicleType, isOfficial = false, status = "Pending" } = req.body;

    if (!licensePlate || !vehicleType) {
      return res.status(400).json({ message: "licensePlate and vehicleType are required" });
    }

    // Check for duplicate entries from the last 24 hours
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existingLog = await TollLog.findOne({
      licensePlate: licensePlate.trim().toUpperCase(),
      timestamp: { $gte: last24Hours },
    });

    if (existingLog) {
      return res.status(409).json({ 
        message: `Vehicle with license plate "${licensePlate.trim().toUpperCase()}" is already present in the system.`,
        isDuplicate: true
      });
    }

    const tollFee = calculateTollFee({ vehicleType, isOfficial });

    const log = await TollLog.create({
      licensePlate,
      vehicleType,
      isOfficial,
      status,
      tollFee,
    });

    return res.status(201).json(log);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create log", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { licensePlate, vehicleType, isOfficial = false, status = "Pending" } = req.body;

    if (!licensePlate || !vehicleType) {
      return res.status(400).json({ message: "licensePlate and vehicleType are required" });
    }

    const tollFee = calculateTollFee({ vehicleType, isOfficial });

    const updatedLog = await TollLog.findByIdAndUpdate(
      req.params.id,
      {
        licensePlate,
        vehicleType,
        isOfficial,
        status,
        tollFee,
      },
      { new: true, runValidators: true }
    );

    if (!updatedLog) {
      return res.status(404).json({ message: "Log not found" });
    }

    return res.json(updatedLog);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update log", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedLog = await TollLog.findByIdAndDelete(req.params.id);

    if (!deletedLog) {
      return res.status(404).json({ message: "Log not found" });
    }

    return res.json({ message: "Log deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete log", error: error.message });
  }
});

module.exports = router;
