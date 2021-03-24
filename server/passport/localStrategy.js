const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;

const strategy = new LocalStrategy(
  {
    usernameField: "username", // not necessary, DEFAULT
  },
  function (username, password, done) {
    User.findOne({ usernameField: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (!user.checkPassword(password)) {
        return done(null, false, { message: "Incorrect password" });
      }
      //console.log("find user", user);
      return done(null, user);
    });
  }
);

module.exports = strategy;
