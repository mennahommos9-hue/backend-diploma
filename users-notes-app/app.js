const express = require("express");
const app = express();

const userRoutes = require("./routes/users.route");
const noteRoutes = require("./routes/notes.route");
const authRoutes = require("./routes/auth.route");

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/auth", authRoutes);

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || "Server error",
  });
});

module.exports = app