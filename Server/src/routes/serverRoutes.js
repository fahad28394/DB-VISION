import express from "express";
import {
  CreateServer,
  getAllServer,
  getServerbyId,
  updateServer,
  deleteServer,
} from "../controllers/serverController.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("ADMIN", "DBA"), CreateServer);

router.get("/", protect, authorize("ADMIN", "DBA", "VIEWER"), getAllServer);

router.get("/:id", protect, authorize("ADMIN", "DBA", "VIEWER"), getServerbyId);
router.put("/:id", protect, authorize("ADMIN", "DBA"), updateServer);
router.delete("/:id", protect, authorize("ADMIN"), deleteServer);

export default router;
