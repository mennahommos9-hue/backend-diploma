const AppDataSource = require("../database/db");
const asyncHandler = require("../utils/asyncHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRepository = AppDataSource.getRepository("user");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userRepository.findOne({ where: { email: email } });
  if (!user) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  const matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.status(200).json({
    message: "logged in successfully",
    token: token,
    data: { id: user.id, username: user.username, email: user.email },
  });
});

module.exports = login;
