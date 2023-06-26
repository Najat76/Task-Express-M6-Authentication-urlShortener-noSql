const connectDb = require("./database"); //ok
const express = require("express"); //ok
const cors = require("cors"); //ok
const morgan = require("morgan"); //ok
const urlRoutes = require("./api/urls/urls.routes");
const userRoutes = require("./api/users/users.routes"); //ok
const passport = require("passport"); //ok
const { localStrategy } = require("./middlewares/passport"); //ok
const POrt = 8000;

connectDb();
const app = express();
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(passport.initialize()); //always after json and before routes
passport.use(localStrategy);

app.use("/urls", urlRoutes);
app.use(userRoutes);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});

//https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
//https://www.geeksforgeeks.org/express-js-res-status-function/
//https://www.tabnine.com/code/javascript/functions/passport-jwt/fromAuthHeaderAsBearerToken
//https://www.passportjs.org/packages/passport-jwt/
