const mongoose = require("mongoose");
const db = require("../server/models");
const User = require("../server/models/user");
const userSeed = [
  {
    username: "admin",
    password: "admin",
  },
];

const ticketSeed = [
  {
    title: "User locked out",
    description: "Cannot log in. Tells me my account is locked.",
    priority: 1,
    requestedBy: "Ava Alda",
    category: "Security",
    subCategory: "User Access",
  },
  {
    title: "Microsoft Word is crashing",
    description:
      "Every time I try to open a Word document my computer freezes up.",
    priority: 2,
    status: 3,
    requestedBy: "Ben Brave",
    category: "Software",
    subCategory: "Bugs",
    technician: "AMA",
    closedDate: Date.now(),
  },
  {
    title: "New employee needs to get setup with network id and email.",
    description:
      "Chris Crank starts next week.  Set him up.  You know what to do.",
    priority: 2,
    status: 2,
    requestedBy: "Darcy Dandelion",
    category: "General",
    technician: "Tim Tiant",
  },
  {
    title: "Server XLKDJLFKJL overheating.",
    description:
      "During busy times this machine overheats and shuts down.  Call for maintenance.",
    priority: 3,
    status: 1,
    requestedBy: "Ben Brave",
    category: "Hardware",
  },
  {
    title: "Add manager permissions for Darcy.",
    description: "Add Darcy Dandelion to the Manager user role group.",
    priority: 1,
    status: 1,
    requestedBy: "Boss Gracie",
    category: "Security",
    subCategory: "Permissions",
    technician: "Sister Pain",
  },
  {
    title: "Install our company sales softare  for Chris Crank.",
    description:
      "New employee Chris Crank will need our propriatary sales software installed on his laptop.",
    priority: 3,
    status: 3,
    requestedBy: "Ben Brave",
    category: "Software",
    subCategory: "Installations",
    technician: "Sister Pain",
  },
];

User.remove({})
  .then(() => User.collection.insertMany(userSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
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
