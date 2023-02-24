const express = require("express");

const login = require("./login.route");
const register = require("./register.route");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hi." });
});

router.use("/login", login);
router.use("/register", register);

module.exports = router;
