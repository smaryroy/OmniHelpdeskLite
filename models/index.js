const mongoose = require("mongoose");

exports.connect = (uri) => {
  mongoose.connect(uri);
  // plug in the promise library:
  mongoose.Promise = global.Promise;

  mongoose.connection.on("error", (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

  // load models
  require("./user");
};

exports.Ticket = require("./ticket");
exports.User = require("./user");
// module.exports = {
//   Ticket: require("./ticket"),
//   User: require("./user"),
// };
