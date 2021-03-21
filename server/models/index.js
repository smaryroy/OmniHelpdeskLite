//Connect to Mongo database
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/omnihelpdesklight";

mongoose.connect(MONGODB_URI).then(
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

module.exports = {
  Ticket: require("./ticket"),
  Connection: mongoose.connection,
};
