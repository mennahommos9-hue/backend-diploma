const express = require("express");
const app = express();

const {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  serchUser
} = require("./controllers/users.controller");

app.use(express.json());

app.get("/api/users/search", serchUser)
app.post("/api/users/", addUser);
app.get("/api/users/", getAllUsers);
app
.route("/api/users/:id")
.get(getUserById)
.patch(updateUser)
.delete(deleteUser);

app.listen(4000, () => {
  console.log("Server Running on 4000...");
});
