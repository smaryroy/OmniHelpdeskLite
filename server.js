require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const mongoose = require("mongoose");
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

//database

mongoose
  .connect(process.env.MONGODB_URI || process.env.DBURL, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
      console.log("Connected to Mongo");
    },
    (err) => {
      /** handle initial connection error */
      console.log("error connecting to Mongo: ");
      console.log(err);
    }
  );

// Sessions
//const MongoStore = require("connect-mongodb-session")(session);
const MongoStore = require("connect-mongo");
app.use(
  session({
    secret: "hownowbrowncow", //pick a random string to make the hash that is generated secure
    //store: new MongoStore({ mongooseConnection: mongoose.connection }),
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || process.env.DBURL,
      dbName: "example-db",
      stringify: false,
    }),
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
