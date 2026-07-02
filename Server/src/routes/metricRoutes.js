import express from "express";
import {
  createMetric,
  getMatricsByServer,
  getLatestMatric,
} from "../controllers/metricController.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("ADMIN", "DBA"), createMetric);

router.get(
  "/server/:serverId",
  protect,
  authorize("ADMIN", "DBA", "VIEWER"),
  getMatricsByServer,
);

router.get(
  "/server/:serverId/latest",
  protect,
  authorize("ADMIN", "DBA", "VIEWER"),
  getLatestMatric,
);

export default router;
