const AppDataSource = require("../database/db");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");

const userRepository = AppDataSource.getRepository("user");

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      message: "please login first",
    });
  }

  const token = authHeader.split(" ")[1];

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userRepository.findOneBy({ id: decodedToken.id });
  if (!user) {
    return res.status(401).json({
      message: "user no longer exist",
    });
  }

  req.user = user;

  next();
});

module.exports = protect;
