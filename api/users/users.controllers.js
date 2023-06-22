const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  const payload = {
    username: user.username,
    _id: user._id,
  };

  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: process.env.EXP,
  });

  return token;
};

exports.signin = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

//https://www.npmjs.com/package/bcrypt
//bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
// Store hash in your password DB.
//});

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

//signup = register
exports.signup = async (req, res, next) => {
  try {
    const { password } = req.body;
    //overwrite req.body.password with the new, hashed password.
    req.body.password = await hashPassword(password);
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ message: "You are Registered now!", token });
  } catch (err) {
    next(err);
  }
};

// const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 'h' });

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};
