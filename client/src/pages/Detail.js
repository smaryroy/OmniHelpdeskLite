import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

function Detail(props) {
  const [ticket, setTicket] = useState({});

  // When this component mounts, grab the ticket with the _id of props.match.params.id
  // e.g. localhost:3000/tickets/599dcb67f0f16317844583fc
  const { id } = useParams();
  useEffect(() => {
    API.getTicket(id)
      .then((res) => setTicket(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>{ticket.title}</h1>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col size="md-2">
          <Link to="/">← Back</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Detail;
