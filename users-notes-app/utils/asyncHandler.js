const asyncHandler = (fn) => {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch (error) {
      res.status(500).json({
        message: "servar error",
        data: error.message,
      });
    }
  };
};

module.exports = asyncHandler
