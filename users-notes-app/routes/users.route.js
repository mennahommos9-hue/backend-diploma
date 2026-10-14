const express = require("express");
const {
  getAllUsers,
  getUserById,
  getMe,
  updateMe,
  deleteUser,
  searchUser,
} = require("../controllers/users.controller");
const validate = require("../middlewares/validation.middleware");
const { updateSchema } = require("../validation/user.validation");
const protect = require("../middlewares/protect.middleware");
const restrictedTo = require("../middlewares/authorization.middleware");

const router = express.Router();

router.get("/search", protect, searchUser);
router.get("/me", protect, getMe);
router
  .route("/")
  .get(protect, restrictedTo("admin"), getAllUsers)
  .patch(protect, validate(updateSchema), updateMe);
router
  .route("/:id")
  .get(protect, restrictedTo("admin"), getUserById)
  .delete(protect, restrictedTo("admin"), deleteUser);

module.exports = router;
