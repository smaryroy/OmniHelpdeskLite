import axios from "axios";

export default {
  // Gets all tickets
  getTickets: function () {
    console.log("in api.js");
    return axios.get("/api/tickets");
  },
  getByStatus: function (id) {
    return axios.get("/api/tickets/status/" + id);
  },
  getByCategory: function (id) {
    console.log("in getByCategory", id);
    return axios.get("/api/tickets/category/" + id);
  },
  getByCategorySub: function (id, sub) {
    console.log("in getByCategorySub", id, sub);
    return axios.get("/api/tickets/category/" + id + "/subcategory/" + sub, {
      params: { cat: id, sub: sub },
    });
  },
  // Gets the ticket with the given id
  getTicket: function (id) {
    return axios.get("/api/tickets/" + id);
  },
  // Deletes the ticket with the given id
  deleteTicket: function (id) {
    return axios.delete("/api/tickets/" + id);
  },
  // Saves a new  ticket to the database
  createTicket: function (ticketData) {
    console.log("in createTicket");
    return axios.post("/api/tickets", ticketData);
  },
  // updates a  ticket to the database
  updateTicket: function (id, ticketData) {
    console.log("in updateTicket");
    return axios.put("/api/tickets/" + id, ticketData);
  },
};
