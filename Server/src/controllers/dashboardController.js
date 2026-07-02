import Server from "../models/server.js";
import Metric from "../models/metrics.js";

export const getDashboard = async (req, res) => {
  try {
    const totalServer = await Server.countDocuments();

    const onlineServer = await Server.countDocuments({
      status: "ONLINE",
    });
    const offlineServer = await Server.countDocuments({
      status: "OFFLINE",
    });
    const maintenanceServer = await Server.countDocuments({
      status: "MAINTENANCE",
    });

    console.log("ONLINE", onlineServer);
    console.log("Total Server", totalServer);
    console.log("Offline Server", offlineServer);
    console.log("Maintenance", maintenanceServer);
    //average cpu usage
    const avgCpu = await Metric.aggregate([
      {
        $group: {
          _id: null,
          averageCpuUsage: {
            $avg: "$cpuUsage",
          },
        },
      },
    ]);
    //Average memory usage
    const avgMemory = await Metric.aggregate([
      {
        $group: {
          _id: null,
          averageMemoryUsage: {
            $avg: "$memoryUsage",
          },
        },
      },
    ]);
    //average diskusage
    const avgdiskUsage = await Metric.aggregate([
      {
        $group: {
          _id: null,
          averageDiskUsage: {
            $avg: "$diskUsage",
          },
        },
      },
    ]);
    const totalMetric = await Metric.countDocuments();

    const latestMatric = await Metric.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $group: {
          _id: "$serverId",
          latestMatric: {
            $first: "$$ROOT",
          },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalServer,
        onlineServer,
        offlineServer,
        maintenanceServer,
        totalMetric,
        averageCpuUsage:
          avgCpu.length > 0 ? Number(avgCpu[0].averageCpuUsage.toFixed(2)) : 0,

        averageMemoryUsage:
          avgMemory.length > 0
            ? Number(avgMemory[0].averageMemoryUsage.toFixed(2))
            : 0,

        averageDiskUsage:
          avgdiskUsage.length > 0
            ? Number(avgdiskUsage[0].averageDiskUsage.toFixed(2))
            : 0,
        latestMatric,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
