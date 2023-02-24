// const User = mongoose.model("User");
const { body } = require("express-validator");
const User = require("../models/user.model");

const registrationValidation = [
  body("email")
    .exists()
    .withMessage("Email cannot be empty.")
    .isEmail()
    .withMessage("Provide a valid email address.")
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        // User.find({ email: req.body.email }, (err, data) => {
        User.find({ email: value }, (err, data) => {
          if (err) reject(new Error("Internal server error."));
          if (data.length > 0) reject(new Error("This email already exists."));
          resolve(true);
        });
      });
    }),
  body("password")
    .exists()
    .withMessage("Password cannot be empty.")
    // .custom((v) => {
    //   return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[A-Za-z0-9]{6,}$/.test(v);
    // })
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[A-Za-z0-9]{8,}$/)
    .withMessage(
      "Your password should be at least 8 characters long, have one uppercase, lowercase and special character."
    ),
  // For reference:
  // ^                        // start of input
  // (?=.*? [A - Z])          // Lookahead to make sure there is at least one upper case letter
  // (?=.*? [a - z])          // Lookahead to make sure there is at least one lower case letter
  // (?=.*? [0 - 9])          // Lookahead to make sure there is at least one number
  // [A - Za - z0 - 9]{ 6, }  // Make sure there are at least 6 characters of [A-Za-z0-9]
  // $                        // end of input
];

// const registrationValidation = [
//   body("email")
//     .exists()
//     .withMessage("Email cannot be empty.")
// ];

module.exports = registrationValidation;
