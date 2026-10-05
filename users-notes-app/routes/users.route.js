const express = require("express");
const {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchUser,
} = require("../controllers/users.controller");

const router = express.Router();

router.get("/search", searchUser);
router.post("/", addUser);
router.get("/", getAllUsers);
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = router;
