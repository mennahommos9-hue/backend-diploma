const asyncHandler = require("../utils/asyncHandler");
const UserServices = require("../services/user.services");

const userServices = new UserServices();

const register = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  const newUser = await userServices.register(username, email, password, role);

  res.status(201).json({
    message: "user added successfully",
    data: newUser,
  });
});

module.exports = register;
