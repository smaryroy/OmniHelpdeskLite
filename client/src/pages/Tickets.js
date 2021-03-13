import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

function Tickets() {
  // Setting our component's initial state
  const [tickets, setTickets] = useState([]);
  const [formObject, setFormObject] = useState({});

  // Load all tickets and store them with setTickets
  useEffect(() => {
    loadTickets();
  }, []);

  // Loads all tickets and sets them to tickets
  function loadTickets() {
    API.getTickets()
      .then((res) => setTickets(res.data))
      .catch((err) => console.log(err));
  }

  // Deletes a ticket from the database with a given id, then reloads tickets from the db
  function deleteTicket(id) {
    API.deleteTicket(id)
      .then((res) => loadTickets())
      .catch((err) => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  // When the form is submitted, use the API.saveTicket method to save the ticket data
  // Then reload tickets from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.author) {
      API.saveTicket({
        title: formObject.title,
        author: formObject.author,
        synopsis: formObject.synopsis,
      })
        .then((res) => loadTickets())
        .catch((err) => console.log(err));
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col size="md-6">
          <Jumbotron>
            <h1>Tickets</h1>
          </Jumbotron>
          <form>
            <Input
              onChange={handleInputChange}
              name="title"
              placeholder="Title (required)"
            />
            <Input
              onChange={handleInputChange}
              name="description"
              placeholder="Description"
            />
            <TextArea
              onChange={handleInputChange}
              name="category"
              placeholder="Category"
            />
            <TextArea
              onChange={handleInputChange}
              name="subCategory"
              placeholder="Sub-Category"
            />
            <FormBtn
              disabled={!(formObject.author && formObject.title)}
              onClick={handleFormSubmit}
            >
              Submit Ticket
            </FormBtn>
          </form>
        </Col>
        <Col size="md-6 sm-12">
          <Jumbotron>
            <h1>My Tickets</h1>
          </Jumbotron>
          {tickets.length ? (
            <List>
              {tickets.map((ticket) => (
                <ListItem key={ticket._id}>
                  <Link to={"/tickets/" + ticket._id}>
                    <strong>{ticket.title}</strong>
                  </Link>
                  <DeleteBtn onClick={() => deleteTicket(ticket._id)} />
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Tickets;
