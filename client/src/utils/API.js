import axios from "axios";

export default {
  // Gets all tickets
  getTickets: function () {
    return axios.get("/tickets");
  },
  // Gets the ticket with the given id
  getTicket: function (id) {
    return axios.get("/ticket/" + id);
  },
  // Deletes the ticket with the given id
  deleteTicket: function (id) {
    return axios.delete("/ticket/" + id);
  },
  // Saves a ticket to the database
  saveBook: function (ticketData) {
    return axios.post("/tickets", ticketData);
  },

  // Gets all user
  getUsers: function () {
    return axios.get("/users");
  },
  // Gets the user with the given id
  getUser: function (id) {
    return axios.get("/user/" + id);
  },
  // Deletes the user with the given id
  deleteUser: function (id) {
    return axios.delete("/user/" + id);
  },
  // Saves a user to the database
  saveUser: function (userData) {
    return axios.post("/users", userData);
  },
};
