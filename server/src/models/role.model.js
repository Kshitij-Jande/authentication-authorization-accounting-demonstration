const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: { type: String },
  permissions: [{ type: String }],
});
