import axios from "axios";

export default {
  // Gets all tickets
  getTickets: function () {
    return axios.get("/api/tickets");
  },
  // Gets the ticket with the given id
  getTicket: function (id) {
    return axios.get("/api/ticket/" + id);
  },
  // Deletes the ticket with the given id
  deleteTicket: function (id) {
    return axios.delete("/api/ticket/" + id);
  },
  // Saves a ticket to the database
  saveBook: function (ticketData) {
    return axios.post("/api/tickets", ticketData);
  },
};
