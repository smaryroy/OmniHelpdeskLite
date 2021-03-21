import axios from "axios";

export default {
  //save new user
  // addUser: function (userData) {
  //   console.log("in adduser");
  //   return axios.post("/api/signup", userData);
  // },
  // validateUser: function (userData) {
  //   console.log("in validateUser");
  //   return axios.post("/api/login", userData);
  // },
  // Gets all tickets
  getTickets: function () {
    console.log("in api.js");
    return axios.get("/api/tickets");
  },
  // Gets the ticket with the given id
  getTicket: function (id) {
    return axios.get("/api/tickets/" + id);
  },
  // Deletes the ticket with the given id
  deleteTicket: function (id) {
    return axios.delete("/api/tickets/" + id);
  },
  // Saves a ticket to the database
  saveTicket: function (ticketData) {
    return axios.post("/api/tickets", ticketData);
  },
};
