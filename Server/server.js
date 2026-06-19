import dotenv from "dotenv";
import app from "./src/app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
  console.log(`App is listening on port${PORT}`);
});
