import React, { useState, useEffect } from "react";
//import React, { Component } from "react";
import API from "../utils/API";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import useDebounce from "../utils/debounceHook";
import "../App.css";

class TicketPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
      searchValue: "",
    };
  }

  componentDidMount() {
    this.loadTickets();
  }

  // Setting our component's initial state
  // const [tickets, setTickets] = useState([]);
  // const [searchValue, setSearchValue] = useState("");

  //const debouncedSearchTerm = useDebounce(searchValue, 800);

  // Load all tickets and store them with setTickets
  // useEffect(() => {
  //   if (!searchValue) {
  //     loadTickets();
  //     return;
  //   }
  // if (debouncedSearchTerm) {
  //   console.log("debounced", searchValue);
  //   const res = searchValue.split(";");
  //   if (res.length === 2) {
  //     queryTickets(res[0], res[1]);
  //   }
  // }
  // }, [debouncedSearchTerm]);

  // handleSearchChange(cat, sub) {
  //   this.setState({searchValue: cat + ";" + sub});
  // }

  handleSearchChange(cat, sub, e) {
    e.preventDefault();
    this.setState({ searchValue: cat + ";" + sub });
  }

  // Loads all tickets and sets them to tickets
  loadTickets() {
    console.log("loadTickets", this.state.searchValue);
    API.getTickets()
      .then((res) => this.setState({ tickets: res.data }))
      .catch((err) => console.log(err));
  }

  queryTickets(cat, sub) {
    console.log("queryTickets", cat, sub);
    if (!sub) {
      API.getByCategory(cat)
        .then((res) => this.setState({ tickets: res.data }))
        .catch((err) => console.log(err));
    } else {
      API.getByCategorySub(cat, sub)
        .then((res) => this.setState({ tickets: res.data }))
        .catch((err) => console.log(err));
    }
  }

  // Deletes a ticket from the database with a given id, then reloads tickets from the db
  // function deleteTicket(id) {
  //   API.deleteTicket(id)
  //     .then((res) => loadTickets())
  //     .catch((err) => console.log(err));
  // }
  render() {
    return (
      <Container className="main-c">
        <Row>
          <Col sm={3} className="catMenu">
            <h6 className="sub-header">Categories</h6>
            <ul>
              <li>
                <a
                  href="#"
                  onClick={(e) => this.handleSearchChange("General", "", e)}
                >
                  General
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => this.handleSearchChange("Security", "", e)}
                >
                  Security
                </a>
                <ul>
                  <li>
                    <a
                      href="#"
                      onClick={(e) =>
                        this.handleSearchChange("Security", "User Access", e)
                      }
                    >
                      User Access
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) =>
                        this.handleSearchChange("Security", "Permissions", e)
                      }
                    >
                      Permissions
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => this.handleSearchChange("Software", "", e)}
                >
                  Software
                </a>
                <ul>
                  <li>
                    <a
                      href="#"
                      onClick={(e) =>
                        this.handleSearchChange("Software", "Installations", e)
                      }
                    >
                      Installations
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) =>
                        this.handleSearchChange("Software", "Bugs", e)
                      }
                    >
                      Bugs
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => this.handleSearchChange("Hardware", "", e)}
                >
                  Hardware
                </a>
              </li>
            </ul>
          </Col>
          <Col className="mybg">
            <Row>
              <Col sm={3}>
                <h4 className="sub-header">Tickets</h4>
              </Col>
              <Col sm={4}></Col>
              <Col sm={4}>
                <Dropdown className="myDropdown">
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Sort By
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Priority</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Something else
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col sm={1}></Col>
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
              {this.state.tickets && this.state.tickets.length ? (
                <div className="scroll-div">
                  <ListGroup className="ticket-list">
                    {this.state.tickets.map((ticket) => (
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
                              <Col className="aln-right">
                                <Card.Link href="#">See Details</Card.Link>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              ) : (
                <h3>No Results to Display</h3>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TicketPage;
