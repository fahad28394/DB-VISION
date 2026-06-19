import express from "express";
import cors from "cors";

const app = express();

//Middlewarw

app.use(cors());
app.use(express.json());

//Test Route

app.get("/", (req, res) => {
  res.status(200).json({
    message: "DBVision API is running successfully 🚀",
  });
});

export default app;
