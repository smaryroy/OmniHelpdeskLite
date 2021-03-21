import React, { useState, useEffect } from "react";
import API from "../utils/API";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import "../App.css";

function TicketPage() {
  // Setting our component's initial state
  const [tickets, setTickets] = useState([]);

  // Load all tickets and store them with setTickets
  useEffect(() => {
    loadTickets();
  }, []);

  // Loads all tickets and sets them to tickets
  function loadTickets() {
    console.log("loadTickets");
    API.getTickets()
      .then((res) => setTickets(res.data))
      .catch((err) => console.log(err));
  }

  // Deletes a ticket from the database with a given id, then reloads tickets from the db
  // function deleteTicket(id) {
  //   API.deleteTicket(id)
  //     .then((res) => loadTickets())
  //     .catch((err) => console.log(err));
  // }

  return (
    <Container className="main-c">
      <Row>
        <Col sm={3} className="catMenu">
          <Dropdown className="myDropdown">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Sort By
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Priority</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <h6 className="sub-header">Categories</h6>
          <ul>
            <li>
              <a href="#">General</a>
            </li>
            <li>
              <a href="#">Security</a>
              <ul>
                <li>
                  <a href="#">Account Issues</a>
                </li>
                <li>
                  <a href="#">Permissions</a>{" "}
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Software</a>
              <ul>
                <li>
                  <a href="#">Installations</a>
                </li>
                <li>
                  <a href="#">Bugs</a>{" "}
                </li>
              </ul>
            </li>
            <li>
              {" "}
              <a href="#">Hardware</a>{" "}
            </li>
          </ul>
        </Col>
        <Col className="mybg">
          <Row>
            <Col sm={3}>
              <h4 className="sub-header">Tickets</h4>
            </Col>
          </Row>
          <Row className="aln-left">
            <Col sm={2}>
              {" "}
              <a href="#" className="link-pad">
                Open(2)
              </a>{" "}
            </Col>
            <Col sm={2}>
              {" "}
              <a href="#" className="link-pad">
                All(7)
              </a>{" "}
            </Col>
            <Col></Col>
          </Row>
          <Row>
            {tickets.length ? (
              <ListGroup className="ticket-list">
                {tickets.map((ticket) => (
                  <ListGroup.Item className="mycard-item" key={ticket._id}>
                    <Card>
                      <Card.Body className="mycard">
                        <Row>
                          <Col>
                            <Card.Title className="mycard-title">
                              {ticket.title}
                            </Card.Title>
                          </Col>
                          <Col>
                            <Card.Text className="mycard-text aln-right">
                              {"Priority:  " + ticket.priority}
                            </Card.Text>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Card.Text>{ticket.description}</Card.Text>
                          </Col>
                          <Col className="aln-right">
                            <Card.Link href="#">See Details</Card.Link>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default TicketPage;
