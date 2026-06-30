import mongoose from "mongoose";

const serverSchema = new mongoose.Schema(
  {
    serverName: {
      type: String,
      required: true,
      trim: true,
    },
    databaseType: {
      type: String,
      enum: ["SQL", "MongoDB", "Postgre", "Oracle"],
      required: true,
    },
    host: {
      type: String,
      required: true,
    },
    port: {
      type: Number,
      required: true,
    },
    environment: {
      type: String,
      enum: ["DEV", "TEST", "UAT", "PROD"],
      default: "DEV",
    },
    status: {
      type: String,
      enum: ["ONLINE", "OFFLINE", "MAINTENANCE"],
      default: "ONLINE",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const server = mongoose.model("Server", serverSchema);

export default server;
