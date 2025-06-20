const express = require("express");
const IOTMail = require("../models/IOTMail"); // Adjust path as needed
const iotRouter = express.Router();

// POST endpoint to create a new IOTMail entry
iotRouter.post("/iotmail", async (req, res) => {
  try {
    const { iotid, email } = req.body;

    // Create new IOTMail document
    const newIOTMail = new IOTMail({
      iotid,
      email,
    });

    // Save to database
    const savedIOTMail = await newIOTMail.save();

    res.status(201).json({
      success: true,
      data: savedIOTMail,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// GET endpoint to find IOTMail by iotid
iotRouter.get("/iotmail/:iotid", async (req, res) => {
  try {
    const iotMail = await IOTMail.findOne({ iotid: req.params.iotid });

    if (!iotMail) {
      return res.status(404).json({
        success: false,
        message: "No email found for this IOT device",
      });
    }

    res.status(200).json({
      success: true,
      data: iotMail,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Update IOTMail by iotid
iotRouter.put("/iotmail", async (req, res) => {
  try {
    const { iotid, email } = req.body;

    const updatedIOTMail = await IOTMail.findOneAndUpdate(
      { iotid },
      { email },
      { new: true, runValidators: true }
    );

    if (!updatedIOTMail) {
      return res.status(404).json({
        success: false,
        message: "No IOTMail found with this device ID",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedIOTMail,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = iotRouter;
