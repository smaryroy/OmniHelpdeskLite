const express = require("express");
const session = require("express-session");
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
const routes = require("./server/routes");
app.use(routes);

const db = require("./server/models");

// Sessions
const MongoStore = require("connect-mongodb-session")(session);
app.use(
  session({
    secret: "hownowbrowncow", //pick a random string to make the hash that is generated secure
    store: new MongoStore({ mongooseConnection: db.Connection }),
    resave: false, //required
    saveUninitialized: false, //required
  })
);

// Passport
const passport = require("./server/passport");
app.use(passport.initialize());
app.use(passport.session());

// Start the API server
app.listen(port, () => console.log("Server started on port", port));
