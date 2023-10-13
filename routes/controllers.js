const app = require("express");
const router = app.Router();
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const User = require("../models/user");
const Message = require("../models/message");

// GET methods
router.get("/", async (req, res) => {
  const msgs = await Message.find({}).exec();
  res.render("index", { messages: msgs });
});
router.get("/signup", (req, res) => res.render("signup"));
router.get("/login", (req, res) => res.render("login"));
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
router.get("/makeMember", (req, res) => res.render("makeMember"));
router.get("/makeAdmin", (req, res) => res.render("makeAdmin"));

// POST methods
router.post(
  "/signup",
  [
    body("firstName")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("First name must be specified.")
      .isAlphanumeric()
      .withMessage("First name has non-alphanumeric characters."),

    body("surname")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Surname must be specified.")
      .isAlphanumeric()
      .withMessage("Surname has non-alphanumeric characters."),

    body("username")
      .trim()
      .isLength({ min: 4 })
      .escape()
      .withMessage("Username must be specified."),

    body("repassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match.");
      }
      return true;
    }),
  ],

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("signup", { errors: errors.array() });
    } else {
      try {
        const usernameExists = await User.findOne({
          username: req.body.username,
        });

        if (usernameExists) {
          const errorMessage =
            "Username already exists. Please choose a different username.";
          return res.render("signup", { errors: [{ msg: errorMessage }] });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user and save it to the database
        const user = new User({
          firstName: req.body.firstName,
          surname: req.body.surname,
          username: req.body.username,
          password: hashedPassword,
          isAdmin: false,
          isMember: false,
        });
        await user.save();

        res.render("index");
      } catch (error) {
        // Handle errors
        console.error("Error during registration:", error);
        res.status(500).send("Error during registration");
      }
    }
  })
);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      // const match = password !== user.password;
      if (match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

router.post(
  "/makeMember",
  asyncHandler(async (req, res, next) => {
    if (req.body.code === process.env.MEMBER_CODE) {
      try {
        console.log(res.locals);
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
  })
);

router.post(
  "/makeAdmin",
  asyncHandler(async (req, res, next) => {
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
  })
);

module.exports = router;
