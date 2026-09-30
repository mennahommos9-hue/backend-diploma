const { users, checkUserById, writeFile } = require("../utils/utils");

const addUser = (req, res) => {
  let userId;
  if (users.length === 0) {
    userId = 1;
  } else {
    userId = users[users.length - 1].id + 1;
  }

  const isFound = users.find((user) => user.email === req.body.email);
  if (isFound) {
    return res.status(400).json({
      message: "user already exist",
    });
  }

  const newUser = { id: userId, ...req.body };
  users.push(newUser);

  writeFile(users);

  res.status(201).json({
    message: "user added successfully",
    data: newUser,
  });
};

const getAllUsers = (req, res) => {
  res.status(200).json({
    message: "success",
    data: users,
  });
};

const getUserById = (req, res) => {
  const { user } = checkUserById(req, res);

  if (!user) return;

  res.status(200).json({
    message: "success",
    data: user,
  });
};

const updateUser = (req, res) => {
  const { user } = checkUserById(req, res);

  if (!user) return;

  Object.assign(user, req.body);

  writeFile(users);

  res.status(200).json({
    message: "user updated successfully",
    data: user,
  });
};

const deleteUser = (req, res) => {
  const { user, id } = checkUserById(req, res);

  if (!user) return;

  const newUsers = users.filter((user) => user.id !== Number(id));

  writeFile(newUsers);

  res.status(200).json({
    message: "user deleted successfully",
  });
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
