const app = require("express");
const router = app.Router();
const Message = require("../models/message");

const userManagement = require("../controllers/userManagement");
const roleManagement = require("../controllers/roleManagement");
const messageManagement = require("../controllers/messageManagement");

// GET methods
router.get("/", async (req, res) => {
  const msgs = await Message.find({}).sort({ added: -1 }).exec();
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
router.get("/new", (req, res) => res.render("new"));
router.get("/makeMember", (req, res) => res.render("makeMember"));
router.get("/makeAdmin", (req, res) => res.render("makeAdmin"));

// POST methods
router.post("/login", userManagement.login);
router.post("/signup", userManagement.signup);
router.post("/makeMember", roleManagement.makeMember);
router.post("/makeAdmin", roleManagement.makeAdmin);
router.post("/new", messageManagement.newMessage);
router.post("/delete/:id", messageManagement.deleteMessage);

module.exports = router;
