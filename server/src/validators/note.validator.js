const { body } = require("express-validator");

const createNoteValidator = [
  body("note")
    .exists()
    .withMessage("Note cannot be empty.")
    .isLength({ min: 5, max: 250 })
    .withMessage("Your node should be between 5 and 250 characters."),
];

const getNoteValidator = [
  body("id").exists().withMessage("Please provide the note ID."),
];

const editNoteValidator = [
  body("id").exists().withMessage("Please provide the note ID."),
  body(""),
];

module.exports = { createNoteValidator };
