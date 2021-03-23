const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: Number, default: 1 },
  status: { type: Number, default: 1 },
  requestedBy: { type: String, default: "me" },
  requestedDate: { type: Date, default: Date.now, immutable: true },
  category: { type: String },
  subCategory: { type: String },
  technician: { type: String },
  lastUpdated: { type: Date },
  closedDate: { type: Date },
  comments: { type: String },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
