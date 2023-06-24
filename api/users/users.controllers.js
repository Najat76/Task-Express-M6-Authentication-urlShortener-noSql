const User = require("../../models/User"); //ok
const bcrypt = require("bcrypt"); // ok
const jwt = require("jsonwebtoken"); //ok
const dotenv = require("dotenv");
dotenv.config();
//require("dotenv").config();  - this can combine the above dotenv lines

//https://www.npmjs.com/package/jsonwebtoken
//jwt.sign(payload, secretOrPrivateKey, [options, callback])
//jwt.sign({
//   data: 'foobar'
// }, 'secret', { expiresIn: '1h' });
// if process.env.EXPIRY drops in env file == might coz problem in production environment,
// so keep it here - recomended from instructor : yousef

const generateToken = (user) => {
  const payload = {
    username: user.username,
    _id: user._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRY,
  });
  return token;
};

exports.signin = async (req, res, next) => {
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
  const saltRounds = 10; // 10 - 12 - 13 is ok - recommended from instructor Yousef
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

//signup = register
// to test : postman + jwt.io
exports.signup = async (req, res, next) => {
  try {
    const { password } = req.body; // i get the value from postman body as object - destructure it
    //overwrite req.body.password with the new, hashed password.
    req.body.password = await hashPassword(password); //  .body = body of postman
    // create User
    const newUser = await User.create(req.body);
    // generate Token
    const token = generateToken(newUser);
    // return Token
    res.status(201).json({ message: "You are Registered now!", token });
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};
