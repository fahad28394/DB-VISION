import express from "express";
import { getDashboard } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", getDashboard, (req, res) => {
  res.send("Hello world");
});

export default router;
