const express = require("express");
const AppDataSource = require("./database/db");
const userRoutes = require("./routes/users.route");
const noteRoutes = require("./routes/notes.route");

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("data server has been connected...");
  })
  .catch((err) => {
    console.log("data server connection error => ", err);
  });

app.listen("5000", () => {
  console.log("server running on 5000...");
});
