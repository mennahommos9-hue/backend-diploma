const express = require("express");

const register = require("../auth/register");
const login = require("../auth/login");
const validate = require("../middlewares/validation.middleware");
const {
  loginSchema,
  registerSchema,
} = require("../validators/user.validation");

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

module.exports = router;
