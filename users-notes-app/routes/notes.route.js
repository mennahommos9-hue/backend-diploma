const express = require("express");
const {
  addNote,
  getAllNotes,
  getUserNotes,
  getMyNotes,
  deleteNote,
  updateNote,
  searchNote,
} = require("../controllers/notes.controller");
const protect = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/search", protect, searchNote);
router.post("/", protect, addNote);
router.get("/", protect, getAllNotes);
router.get("/myNotes", protect, getMyNotes);
router.get("/:userId", protect, getUserNotes);
router.route("/:id").delete(protect, deleteNote).patch(protect, updateNote);

module.exports = router;
