import express from "express";
import dotenv from "dotenv";
import User from "./routes/user.route.js";
import connection from "./configs/connection.js";
import Auth from "./routes/auth.route.js";
import bodyParser from "body-parser";

const app = express();

dotenv.config();

connection();

app.use(bodyParser.json());

app.use("/api/user", User);
app.use("/api/auth", Auth);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
app.listen(3001, () => {
  console.log("Server is running on port 3000");
});
