const AppError = require("../utils/AppError");

const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError("You don't have access", 403));
    }
    next();
  };
};

module.exports = restrictTo;
