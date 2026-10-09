const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchUser,
} = require("../controllers/users.controller");
const protect = require("../middlewares/protect.middleware");

const router = express.Router();

router.get("/search", protect, searchUser);
router.get("/", protect, getAllUsers);
router
  .route("/:id")
  .get(protect, getUserById)
  .patch(protect, updateUser)
  .delete(protect, deleteUser);

module.exports = router;
