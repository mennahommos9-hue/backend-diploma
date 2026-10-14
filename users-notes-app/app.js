const express = require("express");
const app = express();

const errorMiddleware = require("./middlewares/error.middleware");
const userRoutes = require("./routes/users.route");
const noteRoutes = require("./routes/notes.route");
const authRoutes = require("./routes/auth.route");

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/auth", authRoutes);

app.use(errorMiddleware);

module.exports = app;
