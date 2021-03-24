const Ticket = require("../models/ticket");

// Defining methods for the ticketsController
module.exports = {
  findAll: function (req, res) {
    Ticket.find(req.query)
      //  .sort(req.sort)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    Ticket.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    //console.log("ticket create called", req.body);
    Ticket.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => {
        console.log(err);
        res.status(422).json(err);
      });
  },
  update: function (req, res) {
    //console.log("ticket update called");
    Ticket.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    //console.log("ticket remove called");
    Ticket.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findByCategory: function (req, res) {
    //console.log("findByCategory", req.params);
    Ticket.find({ category: req.params.id })
      //  .sort(req.sort)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findByCategorySub: function (req, res) {
    //console.log("findByCategorySub", req.params);
    Ticket.find({ category: req.params.id, subCategory: req.params.sub })
      //  .sort(req.sort)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findByStatus: function (req, res) {
    Ticket.find({ status: req.params.id })
      //  .sort(req.sort)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
