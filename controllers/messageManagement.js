const asyncHandler = require("express-async-handler");
const Message = require("../models/message");

exports.newMessage = asyncHandler(async (req, res, next) => {
  const newMessage = new Message({
    text: req.body.message,
    username: res.locals.user.username,
    name: res.locals.user.name,
    added: new Date(),
  });

  await newMessage.save();
  res.redirect("/");
});

exports.deleteMessage = asyncHandler(async (req, res, next) => {
  try {
    await Message.findByIdAndRemove(req.params.id);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
