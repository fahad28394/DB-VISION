import mongoose from "mongoose";
import Metric from "../models/metrics.js";
import Server from "../models/server.js";

export const createMetric = async (req, res) => {
  try {
    const {
      serverId,
      cpuUsage,
      diskUsage,
      memoryUsage,
      activeConnection,
      databaseSize,
    } = req.body;

    //check server exist or not\
    const server = await Server.findById(serverId);
    if (!server) {
      return res.status(404).json({
        success: false,
        message: "Server not found",
      });
    }

    const metric = await Metric.create({
      serverId,
      cpuUsage,
      diskUsage,
      memoryUsage,
      activeConnection,
      databaseSize,
    });
    res.status(201).json({
      success: true,
      message: "Metric created successfully",
      data: metric,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMatricsByServer = async (req, res) => {
  try {
    const { serverId } = req.params;
    //check objectId format
    if (!mongoose.Types.ObjectId.isValid(serverId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid server Id",
      });
    }
    //check if server exist
    const server = await Server.findById(serverId);
    if (!server) {
      return res.status(400).json({
        success: false,
        message: "Invalid server ",
      });
    }

    //fetch matrics
    const metrics = await Metric.find({ serverId }).sort({ CollectedAt: -1 });

    res.status(200).json({
      success: true,
      count: metrics.length,
      data: metrics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getLatestMatric = async (req, res) => {
  try {
    const { serverId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(serverId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid server id",
      });
    }
    const server = await Server.findById(serverId);
    if (!server) {
      return res.status(400).json({
        success: false,
        message: "Server not found",
      });
    }

    const latestMatric = await Server.findOne({ serverId });

    if (!latestMatric) {
      return res.status(400).json({
        success: false,
        message: "Not found lstest matrics",
      });
    }

    res.status(200).json({
      success: true,
      data: latestMatric,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
