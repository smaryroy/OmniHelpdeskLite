const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: Number, required: true, default: 1 },
  status: { type: Number, required: true, default: 1 },
  requestedBy: { type: String, required: true, default: "me" },
  requestedDate: { type: Date, default: Date.now, immutable: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  technician: { type: String },
  lastUpdated: { type: Date },
  closedDate: { type: Date },
  comments: { type: String },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
