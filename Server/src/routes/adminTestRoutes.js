import express from "express";
import authorize from "../middleware/roleMiddleware.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/admin", protect, authorize("ADMIN"), (req, res) => {
  res.status(200).json({
    success: "True",
    message: "Welcome admin",
  });
});

export default router;
