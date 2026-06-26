import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/dba", protect, authorize("DBA"), (req, res) => {
  res.status(200).json({
    success: "True",
    message: "Welcome Admin",
  });
});

export default router;
