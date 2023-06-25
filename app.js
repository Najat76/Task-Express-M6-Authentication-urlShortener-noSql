const connectDb = require("./database");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const urlRoutes = require("./api/urls/urls.routes");
const userRoutes = require("./api/users/users.routes");
const passport = require("passport");
const { localStrategy } = require("./middlewares/passport");

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
