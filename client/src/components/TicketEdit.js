import React, { useEffect, useState } from "react";
import API from "../utils/API";
import Container from "react-bootstrap/Container";
import { Link, useParams } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import "../App.css";

function TicketPage(props) {
  const [ticket, setTicket] = useState({});

  // When this component mounts, grab the book with the _id of props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  const { id } = useParams();
  useEffect(() => {
    API.getTicket(id)
      .then((res) => setTicket(res.data))
      .catch((err) => console.log(err));
  }, []);

  function statusStr(status) {
    if (status === 1) {
      return "New";
    } else if (status === 2) {
      return "In Progress";
    } else if (status === 3) {
      return "Closed";
    } else {
      return "Closed";
    }
  }

  return (
    <Container fluid className="main-c">
      <Link to="/tickets"> Back To Tickets </Link>
      <Row>
        <Col sm={12}>
          <div className="scroll-div">
            <ListGroup className="ticket-list">
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
                      <Col sm={8}>
                        <Card.Text>{ticket.description}</Card.Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col>Category: {ticket.category}</Col>
                      <Col> {ticket.subCategory}</Col>
                      <Col className="aln-right">
                        Status: {statusStr(ticket.status)}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default TicketPage;
