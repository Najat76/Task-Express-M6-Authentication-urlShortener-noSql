const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv"); // 1
dotenv.config(); // 2
//require("dotenv").config();  - this can combine the above dotenv lines 1 + 2
//const configKeys = require("/config");

//https://www.npmjs.com/package/jsonwebtoken
//jwt.sign(payload, secretOrPrivateKey, [options, callback])
//jwt.sign({
//   data: 'foobar'
// }, 'secret', { expiresIn: '1h' });
// if process.env.EXPIRY drops in env file == might coz problem in production environment,
// so keep it here - recomended from instructor : yousef

//step 3: create a token
const generateToken = (user) => {
  const payload = {
    username: user.username,
    _id: user._id,
  };
  // npm i jsonwebtoken - to generate a token
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRY,
  });
  add;
  return token;
};

// Step 4: signin
//testing my login first using the signin-1

//  sigin-1
// exports.signin = async (req, res, next) => {
//   console.log(req.user);
//   return res.status(204).end();

exports.signin = async (req, res, next) => {
  try {
    const token = createToken(req.user);
    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

//https://www.npmjs.com/package/bcrypt
//bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
// Store hash in your password DB.
//});
// step 1 : hashing the password
const hashPassword = async (password) => {
  const saltRounds = 10; // 10 - 12 - 13 is ok - recommended from instructor Yousef
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// step 2: signup = register
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
    // return Token  ---
    return res.status(201).json({ message: "You are Registered now!", token });
  } catch (error) {
    return next(error);
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
