import mongoose from "mongoose";

const metricsSchema = new mongoose.Schema(
  {
    serverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Server",
      required: true,
    },
    cpuUsage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    diskUsage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    memoryUsage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    activeConnection: {
      type: Number,
      required: true,
      min: 0,
    },
    databaseSize: {
      type: Number,
      required: true,
      min: 0,
    },
    collectedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);
const Metric = mongoose.model("Metric", metricsSchema);

export default Metric;
