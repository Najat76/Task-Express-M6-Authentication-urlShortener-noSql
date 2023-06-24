const { LocalStrategy } = require("passport-local");
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
