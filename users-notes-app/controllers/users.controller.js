const asyncHandler = require("../utils/asyncHandler");
const UserServices = require("../services/user.services");

const userServices = new UserServices();

const getAllUsers = asyncHandler(async (req, res, next) => {
  await userServices.getAllUsers();

  res.status(200).json({
    message: "success",
    data: users,
  });
});

const getUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await userServices.getUserById(id);

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

  const deletedUser = await userServices.deleteUser(id);

  res.status(200).json({
    message: "user deleted successfully",
    data: deletedUser,
  });
});

const updateMe = asyncHandler(async (req, res, next) => {
  const me = req.user.id;

  const updatedMe = await userServices.updateMe(me, req.body);

  res.status(200).json({
    message: "user updated successfully",
    data: {
      id: updatedMe.id,
      username: updatedMe.username,
      email: updatedMe.email,
    },
  });
});

const searchUser = asyncHandler(async (req, res, next) => {
  const { name } = req.query;

  const users = await userServices.searchUsers(name);

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
