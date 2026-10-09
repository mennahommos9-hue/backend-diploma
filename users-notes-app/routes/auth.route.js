const express = require("express");

const register = require("../auth/register")
const login = require("../auth/login")

const router = express.Router();

router.post("/register", register)
router.post("/login", login)

module.exports = router