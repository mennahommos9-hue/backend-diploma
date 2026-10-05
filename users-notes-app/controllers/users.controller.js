const AppDataSource = require("../database/db");
const { ILike } = require("typeorm");
const asyncHandler = require("../utils/asyncHandler");

const userRepository = AppDataSource.getRepository("user");

const addUser = asyncHandler(async (req, res) => {
  const { username, email } = req.body;

  const newUser = userRepository.create({ username, email });
  const savedUser = await userRepository.save(newUser);

  res.status(201).json({
    message: "user added successfully",
    data: savedUser,
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userRepository.find();

  res.status(200).json({
    message: "success",
    data: users,
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await userRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      notes: true,
    },
  });

  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  res.status(200).json({
    message: "success",
    data: user,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await userRepository.findOneBy({ id: id });

  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  await userRepository.delete(user);

  res.status(200).json({
    message: "user deleted successfully",
    data: user,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await userRepository.findOneBy({ id: id });

  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  await userRepository.update(id, req.body);

  const updatedUser = await userRepository.findOneBy({ id: id });

  res.status(200).json({
    message: "user updated successfully",
    data: updatedUser,
  });
});

const searchUser = asyncHandler(async (req, res) => {
  const { name } = req.query;

  const users = await userRepository.find({
    where: { username: ILike(`%${name}%`) },
  });

  if (users.length === 0) {
    return res.status(404).json({
      message: "not found",
    });
  }

  res.status(200).json({
    message: "success",
    data: users,
  });
});

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchUser,
};
