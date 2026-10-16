const asyncHandler = require("../utils/asyncHandler");
const UserServices = require("../services/user.services");

const userServices = new UserServices();

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { user, token } = await userServices.login(email, password);

  res.status(200).json({
    message: "logged in successfully",
    token: token,
    data: { id: user.id, username: user.username, email: user.email },
  });
});

module.exports = login;
