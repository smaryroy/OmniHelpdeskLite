import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

function TicketPage() {
  // Setting our component's initial state
  const [tickets, setTickets] = useState([]);
  const [formObject, setFormObject] = useState({});

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
  function deleteTicket(id) {
    API.deleteTicket(id)
      .then((res) => loadTickets())
      .catch((err) => console.log(err));
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <h4 className="sub-header">Tickets</h4>
          {tickets.length ? (
            <ListGroup>
              {tickets.map((ticket) => (
                <ListGroup.Item key={ticket._id}>
                  <Card style={{ width: "50rem" }}>
                    <Card.Body>
                      <Row>
                        <Col>
                          <Card.Title>{ticket.title}</Card.Title>
                        </Col>
                        <Col>
                          <Card.Subtitle className="mb-2 text-muted aln-right">
                            {"Priority:  " + ticket.priority}
                          </Card.Subtitle>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Card.Text>{ticket.description}</Card.Text>
                        </Col>
                      </Row>
                      <Row className="aln-right">
                        <Col>
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
        </Col>
      </Row>
    </Container>

    // <Container fluid>
    //   <Row>
    //     <Col size="md-4"></Col>
    //     <Col size="md-8">
    //       <h1>Tickets</h1>
    //       {tickets.length ? (
    //         <List>
    //           {tickets.map((ticket) => (
    //             <ListItem key={ticket._id}>
    //               <Link to={"/tickets/" + ticket._id}>
    //                 <strong>{ticket.title}</strong>
    //               </Link>
    //               <DeleteBtn onClick={() => deleteTicket(ticket._id)} />
    //             </ListItem>
    //           ))}
    //         </List>
    //       ) : (
    //         <h3>No Results to Display</h3>
    //       )}
    //     </Col>
    //   </Row>
    // </Container>
  );
}

export default TicketPage;
