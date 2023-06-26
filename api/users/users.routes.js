const express = require("express");
const router = express.Router();
const { signup, signin, getUsers } = require("./users.controllers");
const passport = require("passport");
//const { localStrategy } = require("./middlewares/passport"); no need to it here only required in app.js

// register
router.post("/signup", signup); //ok

// signin
router.post(
  "/signin",
  signin,
  passport.authenticate("local", { session: false }) //local is coming from local-strategy
);

//others
router.get("/users", getUsers);

module.exports = router;
