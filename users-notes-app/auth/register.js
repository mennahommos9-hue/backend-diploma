const AppDataSource = require("../database/db");
const asyncHandler = require("../utils/asyncHandler");
const bcrypt = require("bcrypt");

const userRepository = AppDataSource.getRepository("user");

const register = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = userRepository.create({
    username,
    email,
    password: hashedPassword,
    role
  });
  const savedUser = await userRepository.save(newUser);

  res.status(201).json({
    message: "user added successfully",
    data: savedUser,
  });
});

module.exports = register;
