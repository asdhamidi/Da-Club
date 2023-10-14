const asyncHandler = require("express-async-handler");
const User = require("../models/user");

exports.makeMember = asyncHandler(async (req, res, next) => {
  if (req.body.code === process.env.MEMBER_CODE) {
    try {
      // Find the current user
      const user = await User.findOne({
        username: res.locals.user.username,
      });
      // Update the user's properties
      user.isMember = true;

      // Save the updated user
      await user.save();

      res.redirect("/");
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).send("Error updating user");
    }
  } else next();
});

exports.makeAdmin = asyncHandler(async (req, res, next) => {
  if (req.body.code === process.env.ADMIN_CODE) {
    try {
      // Find the current user
      const user = await User.findOne({
        username: res.locals.user.username,
      });

      // Update the user's properties
      user.isAdmin = true;

      // Save the updated user
      await user.save();

      res.redirect("/");
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).send("Error updating user");
    }
  } else next();
});
