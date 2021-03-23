const router = require("express").Router();
const apiRoutes = require("./api");
const path = require("path");
const passport = require("../passport");
const authController = require("../controllers/authController");

// API Routes
router.use("/api", apiRoutes);

// authentication routes);
router.get("/user", authController.getCurrentUser);
// router.post(
//   "/auth/signup",
//   authController.checkAlreadyRegistered,
//   authController.registerUser,
//   passport.authenticate("local"),
//   authController.login
// );

router.post(
  "/auth/signup",
  authController.checkAlreadyRegistered,
  authController.registerUser,
  passport.authenticate("local"),
  authController.login
);

router.post(
  "/auth/login",
  authController.checkAlreadyRegistered,
  authController.registerUser,
  passport.authenticate("local"),
  authController.login
);

router.post("/auth/logout", authController.logout);

// If no API routes are hit, send the React app
router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
