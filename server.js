require("dotenv").config();
const express = require("express");
const session = require("express-session");
const routes = require("./server/routes");
const passport = require("passport");
const dbConnection = require("./server/database");
var MongoDBStore = require("connect-mongodb-session")(session);

const app = express();

const port = process.env.PORT || 3001;

/* Express setup */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// User Routes
const user = require("./server/routes/user");

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser
app.use("/user", user);

// Sessions
app.use(
  session({
    secret: "bootcamp", //pick a random string to make the hash that is generated secure
    store: new MongoDBStore({ mongooseConnection: dbConnection }),
    resave: false, //required
    saveUninitialized: false, //required
  })
);

// Start the API server
app.listen(port, () => console.log("Server started on port", port));
