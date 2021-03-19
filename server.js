const express = require("express");
// Requiring passport as we've configured it
const passport = require("./config/passport");
const mongoose = require("mongoose");
const appRoutes = require("./routes");
const app = express();
const config = require("./config");

const PORT = process.env.PORT || 3001;

// connect to the database and load models
require("./models").connect("mongodb://localhost/omnihelpdesklight");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
//app.use(express.static('./client/dist/'));

// load passport strategies
app.use(passport.initialize());
const localSignupStrategy = require("./passport/local-signup");
const localLoginStrategy = require("./passport/local-login");
passport.use("local-signup", localSignupStrategy);
passport.use("local-login", localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require("./middleware/auth-check");
app.use("/api", authCheckMiddleware);

// routes

app.use(appRoutes);
console.log("appRoutes", appRoutes);

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
