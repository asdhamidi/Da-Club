const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const User = require("./user");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  text: {
    type: String,
    required: true,
    maxLength: 500,
  },
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  username: {
    type: String,
    required: true,
    maxLength: 15,
  },
  added: {
    type: Date,
    required: true,
  },
});

MessageSchema.virtual("added_formatted").get(function () {
  return DateTime.fromJSDate(this.added, { zone: "Asia/Kolkata" }).toFormat(
    "t, DD"
  );
});

module.exports = mongoose.model("Message", MessageSchema);
