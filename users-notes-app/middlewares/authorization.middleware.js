const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You don't have access",
      });
    }
    next();
  };
};

module.exports = restrictTo
