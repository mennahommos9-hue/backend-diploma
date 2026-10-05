const express = require("express");
const {
  addNote,
  getAllNotes,
  getUserNotes,
  deleteNote,
  updateNote,
  searchNote,
} = require("../controllers/notes.controller");

const router = express.Router();

router.get("/search", searchNote);
router.post("/", addNote);
router.get("/", getAllNotes);
router.get("/:userId", getUserNotes);
router.route("/:id").delete(deleteNote).patch(updateNote);

module.exports = router;
