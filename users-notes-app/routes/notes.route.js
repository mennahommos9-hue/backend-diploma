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
const validate = require("../middlewares/validation.middleware");
const {
  addNoteSchema,
  updateNoteSchema,
} = require("../validation/note.validation");
const protect = require("../middlewares/protect.middleware");

const router = express.Router();

router.get("/search", protect, searchNote);
router.post("/", protect, validate(addNoteSchema), addNote);
router.get("/", protect, getAllNotes);
router.get("/myNotes", protect, getMyNotes);
router.get("/:userId", protect, getUserNotes);
router
  .route("/:id")
  .delete(protect, deleteNote)
  .patch(protect, validate(updateNoteSchema), updateNote);

module.exports = router;
