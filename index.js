const express = require("express");
const path = require("path");
const { pool1, pool2 } = require("./config/db");
const fetchToData = require("./routes/fetchToData");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
//routes
app.use("/api/salary", fetchToData);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api is running...");
  });
}
app.use("*", (req, res, next) => {
  return res.status(404).json({ message: "route not found" });
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server running at 5000.....");
});
