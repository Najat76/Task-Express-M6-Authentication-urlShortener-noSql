const express = require("express");

const router = express.Router();

const { signup, signin, getUsers } = require("./users.controllers");

router.post("/signup", signup); //ok

router.post(
  "/signin",
  signin,
  passport.authenticate("local", { session: false })
);
router.get("/users", getUsers);

module.exports = router;
