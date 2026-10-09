const AppDataSource = require("../database/db");
const asyncHandler = require("../utils/asyncHandler");
const bcrypt = require("bcrypt");

const userRepository = AppDataSource.getRepository("user");

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const user = await userRepository.findOne({ where: { email: email } });

  if (user) {
    return res.status(400).json({
      message: "user already exist",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = userRepository.create({
    username,
    email,
    password: hashedPassword,
  });
  const savedUser = await userRepository.save(newUser);

  res.status(201).json({
    message: "user added successfully",
    data: savedUser,
  });
});

module.exports = register;
