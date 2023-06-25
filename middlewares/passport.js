const { LocalStrategy } = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const user = require("../models/User");
const bcrypt = require("bcrypt");

const localStrategy = LocalStrategy(
  { usernmaeField: "username" },
  async (username, password, done) => {
    try {
      // step 1: find the user
      const foundUser = await User.findOne({ username: username });

      if (!foundUser) {
        return done(null, false);
      }
      //check incoming password with the saved password for the user (in db)
      // important Note: any time using bcrypt functions: 1st variable is what is coming from the user : instruct. Yousef
      const passwordsMatch = await bcrypt.compare(password, foundUser.password);

      if (!passwordsMatch) {
        return done(null, false);
      }
      return done(null, foundUser);
    } catch (error) {
      done(error);
    }
  }
);
//https://www.passportjs.org/packages/

exports.jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },

  async (token, done) => {
    //if the token is expired or not by comparing the expiration date to the date right now.
    //If the token is expired, call done and pass it null and false
    if (Date.now > process.env.EXPIRY) {
      return done(null, false);
    }
    try {
      //If the token is not expired, we will find the user with the ID saved in the token
      const user = await User.findOne(username._Id);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
