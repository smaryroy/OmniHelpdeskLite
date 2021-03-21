const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Ticket  collection and inserts the tickets  below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/omnihelpdesklight"
);

const userSeed = [
  {
    email: "admin@test.com",
    password: "admin",
    name: "Administrator",
  },
];

const ticketSeed = [
  {
    title: "User locked out",
    description: "Cannot log in. Tells me my account is locked.",
    category: "Security",
    subCategory: "User Access",
  },
  {
    title: "Microsoft Word is crashing",
    description:
      "Every time I try to open a Word document my computer freezes up.",
    category: "Software",
    subCategory: "Software Issues",
  },
];
db.User.remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then((data) => {
    console.log(data.result.n + " users inserted!");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

db.Ticket.remove({})
  .then(() => db.Ticket.collection.insertMany(ticketSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
