require("dotenv").config();
const express = require("express");

const AppDataSource = require("./database/db");
const userRoutes = require("./routes/users.route");
const noteRoutes = require("./routes/notes.route");
const authRoutes = require("./routes/auth.route");

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/auth", authRoutes);

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || "Server error",
  });
});

AppDataSource.initialize()
  .then(() => {
    console.log("data server has been connected...");
  })
  .catch((err) => {
    console.log("data server connection error => ", err);
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server running on ${port}...`);
});
