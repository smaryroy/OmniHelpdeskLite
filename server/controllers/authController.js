const User = require("../models/user");
module.exports = {
  getCurrentUser: function (req, res) {
    if (req.user) {
      res.json({ user: req.user });
    } else {
      res.json({ user: null });
    }
  },

  checkAlreadyRegistered: async function (req, res, next) {
    //console.log("see if registered");
    const { username } = req.body;
    const registered = await User.find({ username });
    if (registered[0] && registered[0]._id) {
      res.json({
        error: `Sorry, already a user with the username: ${username}`,
      });
      return;
    }
    next();
  },
  registerUser: async function (req, res) {
    //console.log("in user registration");
    const { username, password } = req.body;
    await new User({ username, password }).save().catch((err) => {
      //console.log("register error: ", err);
      res.json({ error: "Unable to register user." });
    });
    return res.send(req.user);
  },

  login: function (req, res) {
    //console.log("authController login");
    req.login.bind(req);
    req.login(req.user, function (err) {
      if (err) {
        res.json({ error: err });
      }
      return res.send(req.user);
    });
  },

  logout: function (req, res) {
    if (req.user) {
      req.logout();
      res.send({ msg: "logged out" });
    } else {
      res.send({ msg: "no user to log out" });
    }
  },
};
