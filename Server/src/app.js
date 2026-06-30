import express from "express";
import cors from "cors";
import authRoutes from "./routes/authroute.js";
import testroutes from "./routes/testroutes.js";
import adminTestRoutes from "./routes/adminTestRoutes.js";
import dbatestRoutes from "./routes/dbaTestRoutes.js";
import serverRoutes from "./routes/serverRoutes.js";

const app = express();

//Middlewarw

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/test", testroutes);
app.use("/api/main", adminTestRoutes);
app.use("/api/dba1", dbatestRoutes);
app.use("/api/Server", serverRoutes);

//Test Route

app.get("/", (req, res) => {
  res.status(200).json({
    message: "DBVision API is running successfully 🚀",
  });
});

export default app;
