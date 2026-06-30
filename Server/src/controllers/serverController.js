import Server from "../models/server.js";

export const CreateServer = async (req, res) => {
  try {
    const {
      serverName,
      databaseType,
      host,
      port,
      environment,
      status,
      createdBy,
    } = req.body;

    //create server document
    const server = await Server.create({
      serverName,
      databaseType,
      host,
      port,
      environment,
      status,
      createdBy: req.user.id,
    });

    res.status(201).json({
      status: true,
      message: "Server created successfully",
      data: server,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllServer = async (req, res) => {
  try {
    const server = await Server.find()
      .populate("createdBy", "userName email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: server.length,
      data: server,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getServerbyId = async (req, res) => {
  try {
    const getServer = await Server.findById(req.params.id).populate(
      "createdBy",
      "userName email role",
    );
    if (!getServer) {
      res.status(400).json({
        success: false,
        message: "Server not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Server found",
      data: getServer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateServer = async (req, res) => {
  try {
    const updateServer = await Server.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    ).populate("createdBy", "userName email role");
    if (!updateServer) {
      res.status(400).json({
        success: false,
        message: "Server not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Server found",
      data: updateServer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteServer = async (req, res) => {
  try {
    const deleteServer = await Server.findById(req.params.id);
    if (!deleteServer) {
      res.status(400).json({
        success: false,
        message: "Server not found",
      });
    }
    await deleteServer.deleteOne();
    res.status(200).json({
      success: true,
      message: "Server deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
