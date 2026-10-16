const asyncHandler = require("../utils/asyncHandler");
const NoteServices = require("../services/note.services");

const noteServices = new NoteServices();

const addNote = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;

  const newNote = await noteServices.addNote(title, content, req.user);

  res.status(201).json({
    message: "note added successfully",
    data: newNote,
  });
});

const getAllNotes = asyncHandler(async (req, res, next) => {
  const notes = await noteServices.getAllNotes();

  res.status(200).json({
    message: "success",
    data: notes,
  });
});

const getUserNotes = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  const { user, userNotes } = await noteServices.getUserNotes(userId);

  res.status(200).json({
    message: `success, ${user.username}'s notes`,
    data: userNotes,
  });
});

const getMyNotes = asyncHandler(async (req, res, next) => {
  const { id } = req.user;

  const myNotes = await noteServices.getMyNotes(id);

  res.status(200).json({
    message: "success",
    data: myNotes,
  });
});

const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await noteServices.deleteNote(id, req.user);

  res.status(200).json({
    message: "note deleted successfully",
  });
});

const updateNote = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const updatedNote = await noteServices.updateNote(id, req.body, req.user);
  res.status(200).json({
    message: "note updated successfully",
    data: updatedNote,
  });
});

const searchNote = asyncHandler(async (req, res, next) => {
  const { title } = req.query;

  const notes = await noteServices.searchNotes(title);

  res.status(200).json({
    message: "success",
    data: notes,
  });
});

module.exports = {
  addNote,
  getAllNotes,
  getUserNotes,
  getMyNotes,
  updateNote,
  deleteNote,
  searchNote,
};
