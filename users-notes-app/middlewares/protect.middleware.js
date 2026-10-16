const AppDataSource = require("../config/db");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const userRepository = AppDataSource.getRepository("user");

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new AppError("please login first", 401));
  }

  const token = authHeader.split(" ")[1];

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userRepository.findOneBy({ id: decodedToken.id });
  if (!user) {
    return next(new AppError("user no longer exist", 401));
  }

  req.user = user;

  next();
});

module.exports = protect;
