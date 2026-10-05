const { ILike } = require("typeorm");
const AppDataSource = require("../database/db");
const asyncHandler = require("../utils/asyncHandler");

const noteRepository = AppDataSource.getRepository("note");
const userRepository = AppDataSource.getRepository("user");

const addNote = asyncHandler(async (req, res) => {
  const { title, content, userId } = req.body;

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  const newNote = noteRepository.create({ title, content, user });
  const savedNote = await noteRepository.save(newNote);

  res.status(201).json({
    message: "note added successfully",
    data: savedNote,
  });
});

const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await noteRepository.find();

  res.status(200).json({
    message: "success",
    data: notes,
  });
});

const getUserNotes = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  const userNotes = await noteRepository.find({ userId: userId });

  res.status(200).json({
    message: `success, ${user.username}'s notes`,
    data: userNotes,
  });
});

const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const note = await noteRepository.findOneBy({ id: id });

  if (!note) {
    return res.status(404).json({
      message: "note not found",
    });
  }

  await noteRepository.delete(note);

  res.status(200).json({
    message: "note deleted successfully",
  });
});

const updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const note = await noteRepository.findOneBy({ id: id });

  if (!note) {
    return res.status(404).json({
      message: "note not found",
    });
  }

  await noteRepository.update(id, req.body);
  const updatedNote = await noteRepository.findOneBy({ id: id });

  res.status(200).json({
    message: "note updated successfully",
    data: updatedNote,
  });
});

const searchNote = asyncHandler(async (req, res) => {
  const { title } = req.query;

  const notes = await noteRepository.find({
    where: { title: ILike(`%${title}%`) },
  });

  if (notes.length === 0) {
    return res.status(404).json({
      message: "not found",
    });
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
  updateNote,
  deleteNote,
  searchNote,
};
