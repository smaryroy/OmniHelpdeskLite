import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import Container from "react-bootstrap/Container";
import { Link, useParams } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./style.css";

function TicketPage(props) {
  const [ticket, setTicket] = useState({});

  // When this component mounts, grab the book with the _id of props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  const { id } = useParams();
  useEffect(() => {
    //console.log(props);
    if (props.isLoggedIn) {
      loadTicket(id);
    } else {
      props.gotoLogin();
    }
    // loadTicket(id);
  }, []);

  function loadTicket(id) {
    //console.log("in loadTicket", id);
    if (!id) return;
    API.getTicket(id)
      .then((res) => setTicket(res.data))
      .catch((err) => console.log(err));
  }

  function handleChange(e) {
    let fieldName = e.target.name;
    let fleldVal = e.target.value;
    //console.log("change", fieldName, fleldVal);
    ticket[fieldName] = fleldVal;
    const newTicket = {
      _id: ticket._id ? ticket._id : null,
      title: ticket.title ? ticket.title : "",
      description: ticket.description ? ticket.description : "",
      priority: ticket.priority ? ticket.priority : 1,
      status: ticket.status ? ticket.status : 1,
      requestedBy: ticket.requestedBy ? ticket.requestedBy : "me",
      requestedDate: ticket.requestedDate,
      category: ticket.category ? ticket.category : "General",
      subCategory: ticket.subCategory,
      technician: ticket.technician,
      closedDate: ticket.closedDate,
      comments: ticket.comments,
    };
    setTicket(newTicket);
  }

  function handleSubmit(e) {
    e.preventDefault();
    //console.log("saving", ticket);
    if (ticket._id) {
      API.updateTicket(ticket._id, ticket)
        .then((res) => setTicket({ tickets: res.data }))
        .catch((err) => console.log(err));
    } else {
      delete ticket._id;
      API.createTicket(ticket)
        .then((res) => setTicket({ tickets: res.data }))
        .catch((err) => console.log(err));
    }
  }

  return (
    <Container fluid>
      <Button variant="primary">
        <Link className="return-link" to="/tickets">
          Back To Tickets{" "}
        </Link>
      </Button>

      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="title"
                  name="title"
                  value={ticket.title}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="formGridStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="New"
                  name="status"
                  value={ticket.status}
                  onChange={handleChange}
                >
                  <option value="1">New</option>
                  <option value="2">In Progress</option>
                  <option value="3">Closed</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridBy">
                <Form.Label>Requested By</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="requestedBy"
                  name="requestedBy"
                  value={ticket.requestedBy}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="formGridCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="General"
                  name="category"
                  value={ticket.category}
                  onChange={handleChange}
                >
                  <option>General</option>
                  <option>Security</option>
                  <option>Software</option>
                  <option>Hardware</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} md="2" controlId="formGridPriority">
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="High"
                  name="priority"
                  value={ticket.priority}
                  onChange={handleChange}
                >
                  <option value="1">High</option>
                  <option value="2">Medium</option>
                  <option value="3">Low</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="description"
                name="description"
                value={ticket.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Row>
              {/* <Form.Group as={Col} controlId="formGridSub">
                <Form.Label>Subcategory</Form.Label>
                <Form.Control />
              </Form.Group> */}
              <Form.Group as={Col} controlId="formGridComments">
                <Form.Label>Comments</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="comments"
                  name="comments"
                  value={ticket.comments}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form.Row>

            <Button className="save-btn" variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
export default TicketPage;
