const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 25,
  },
  surname: {
    type: String,
    required: true,
    maxLength: 25,
  },
  username: {
    type: String,
    required: true,
    maxLength: 15,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  isMember: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.virtual("name").get(function () {
  return this.firstName + " " + this.surname;
});

module.exports = mongoose.model("User", UserSchema);
