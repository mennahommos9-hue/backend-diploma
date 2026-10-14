const AppDataSource = require("../database/db");
const { ILike } = require("typeorm");
const asyncHandler = require("../utils/asyncHandler");

const userRepository = AppDataSource.getRepository("user");

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await userRepository.find({
    select: { id: true, username: true, email: true },
  });

  res.status(200).json({
    message: "success",
    data: users,
  });
});

const getUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await userRepository.findOne({
    where: {
      id: id,
    },
    select: { id: true, username: true, email: true },
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

const getMe = asyncHandler(async (req, res, next) => {
  const me = req.user;

  res.status(200).json({
    message: "success",
    data: { id: me.id, username: me.username, email: me.email },
  });
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await userRepository.findOne({
    where: {
      id: id,
    },
    select: { id: true, username: true, email: true },
  });

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

const updateMe = asyncHandler(async (req, res, next) => {
  const me = req.user;

  await userRepository.update(me, req.body);

  const updatedMe = await userRepository.findOne({
    where: {
      id: me.id,
    },
    select: { id: true, username: true, email: true },
  });

  res.status(200).json({
    message: "user updated successfully",
    data: updatedMe,
  });
});

const searchUser = asyncHandler(async (req, res, next) => {
  const { name } = req.query;

  const users = await userRepository.find({
    where: { username: ILike(`%${name}%`) },
    select: { id: true, username: true, email: true },
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
  getAllUsers,
  getUserById,
  getMe,
  updateMe,
  deleteUser,
  searchUser,
};
