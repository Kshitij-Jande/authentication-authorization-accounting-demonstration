const express = require("express");
const registrationValidation = require("../validators/register.validator");
const { registerUser, loginUser } = require("../controllers/user.controller");
const { check } = require("express-validator");

const router = express.Router();

// const validator = (req, res, next) => {
//   let errMsg = "";
//   if (!req.body.email) {
//   }
// };

// router.post("/", registrationValidation, (req, res) => {
//   // Register logic here
// });
router.post("/", registrationValidation, registerUser, loginUser);

module.exports = router;
