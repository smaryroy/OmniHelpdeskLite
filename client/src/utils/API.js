import axios from "axios";

// function checkStatus(response) {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   }
//   const error = new Error(`HTTP Error ${response.statusText}`);
//   error.status = response.statusText;
//   error.response = response;
//   console.log(error);
//   throw error;
// }

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
  getByCategory: function (cat) {
    console.log("in getByCategory", cat);
    return axios.get("/api/tickets/category/" + cat);
  },
  getByCategorySub: function (cat, sub) {
    console.log("in getByCategorySub", cat, sub);
    return axios.get("/api/tickets/category/" + cat + "/subcategory/" + sub);
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
  saveBook: function (ticketData) {
    return axios.post("/api/tickets", ticketData);
  },
};
