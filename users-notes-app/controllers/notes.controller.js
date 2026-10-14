const { ILike } = require("typeorm");
const AppDataSource = require("../database/db");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const noteRepository = AppDataSource.getRepository("note");
const userRepository = AppDataSource.getRepository("user");

const addNote = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;

  const newNote = noteRepository.create({
    title,
    content,
    user: {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
    },
  });
  const savedNote = await noteRepository.save(newNote);

  res.status(201).json({
    message: "note added successfully",
    data: savedNote,
  });
});

const getAllNotes = asyncHandler(async (req, res, next) => {
  const notes = await noteRepository.find();

  res.status(200).json({
    message: "success",
    data: notes,
  });
});

const getUserNotes = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    return next(new AppError("user not found", 404));
  }

  const userNotes = await noteRepository.find({
    where: { user: { id: user.id } },
  });

  res.status(200).json({
    message: `success, ${user.username}'s notes`,
    data: userNotes,
  });
});

const getMyNotes = asyncHandler(async (req, res, next) => {
  const { id } = req.user;

  const myNotes = await noteRepository.find({ where: { user: { id: id } } });
  if (myNotes.length === 0) {
    return next(new AppError("you don't have any notes", 404));
  }

  res.status(200).json({
    message: "success",
    data: myNotes,
  });
});

const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const note = await noteRepository.findOne({
    where: { id: id },
    relations: {
      user: true,
    },
  });

  if (!note) {
    return next(new AppError("note note found", 404));
  }

  if (note.user.id !== req.user.id && req.user.role !== "admin") {
    return next(new AppError("You don't have access to delete this note", 403));
  }

  await noteRepository.delete(note);

  res.status(200).json({
    message: "note deleted successfully",
  });
});

const updateNote = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const note = await noteRepository.findOne({
    where: { id: id },
    relations: {
      user: true,
    },
  });

  if (!note) {
    return next(new AppError("note note found", 404));
  }

  if (note.user.id !== req.user.id && req.user.role !== "admin") {
    return next(new AppError("You don't have access to update this note", 403));
  }

  await noteRepository.update(id, req.body);
  const updatedNote = await noteRepository.findOneBy({ id: id });

  res.status(200).json({
    message: "note updated successfully",
    data: updatedNote,
  });
});

const searchNote = asyncHandler(async (req, res, next) => {
  const { title } = req.query;

  const notes = await noteRepository.find({
    where: { title: ILike(`%${title}%`) },
  });

  if (notes.length === 0) {
    return next(new AppError("not found", 404));
  }

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
