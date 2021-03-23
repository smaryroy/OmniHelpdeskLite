import React from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
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
    if (this.props.isLoggedIn) {
      this.loadTickets();
    } else {
      this.props.gotoLogin();
    }
  }

  handleSearchChange(cat, sub, e) {
    e.preventDefault();
    this.setState({ searchValue: cat + ";" + sub });
    this.queryTickets(cat, sub);
  }

  // Loads all tickets and sets them to tickets
  loadTickets() {
    console.log("loadTickets", this.state.searchValue);
    API.getTickets()
      .then((res) => this.setState({ tickets: res.data }))
      .catch((err) => console.log(err));
  }

  getByStatus(id) {
    API.getByStatus(id)
      .then((res) => this.setState({ tickets: res.data }))
      .catch((err) => console.log(err));
  }

  queryTickets(cat, sub) {
    console.log("queryTickets", cat, sub);
    const id = cat;
    if (!sub) {
      API.getByCategory(id)
        .then((res) => this.setState({ tickets: res.data }))
        .catch((err) => console.log(err));
    } else {
      API.getByCategorySub(cat, sub)
        .then((res) => this.setState({ tickets: res.data }))
        .catch((err) => console.log(err));
    }
  }

  statusStr(status) {
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

  // Deletes a ticket from the database with a given id, then reloads tickets from the db
  // function deleteTicket(id) {
  //   API.deleteTicket(id)
  //     .then((res) => loadTickets())
  //     .catch((err) => console.log(err));
  // }

  render() {
    return (
      <Container fluid className="main-c">
        <Row>
          <Col sm={3} className="catMenu">
            <h6 className="sub-header">Categories</h6>
            <ul>
              <li>
                <button
                  className="catItem"
                  onClick={(e) => this.handleSearchChange("General", "", e)}
                >
                  General
                </button>
              </li>
              <li>
                <button
                  className="catItem"
                  onClick={(e) => this.handleSearchChange("Security", "", e)}
                >
                  Security
                </button>

                <ul>
                  <li>
                    <button
                      className="catItem"
                      onClick={(e) =>
                        this.handleSearchChange("Security", "User Access", e)
                      }
                    >
                      User Access
                    </button>
                  </li>
                  <li>
                    <button
                      className="catItem"
                      onClick={(e) =>
                        this.handleSearchChange("Security", "Permissions", e)
                      }
                    >
                      Permissions
                    </button>
                  </li>
                </ul>
              </li>
              <li>
                <button
                  className="catItem"
                  onClick={(e) => this.handleSearchChange("Software", "", e)}
                >
                  Software
                </button>
                <ul>
                  <li>
                    <button
                      className="catItem"
                      onClick={(e) =>
                        this.handleSearchChange("Software", "Installations", e)
                      }
                    >
                      Installations
                    </button>
                  </li>
                  <li>
                    <button
                      className="catItem"
                      onClick={(e) =>
                        this.handleSearchChange("Software", "Bugs", e)
                      }
                    >
                      Bugs
                    </button>
                  </li>
                </ul>
              </li>
              <li>
                <button
                  className="catItem"
                  onClick={(e) => this.handleSearchChange("Hardware", "", e)}
                >
                  Hardware
                </button>
              </li>
            </ul>
          </Col>
          <Col>
            <Row>
              <Col sm={3}>
                <h4 className="sub-header">Tickets</h4>
              </Col>
              <Col style={{ justifyContent: "flex-end" }}>
                {/* <div className="dropdown">
                  <button className="dropbtn">Sort By</button>
                  <div className="dropdown-content">
                    <p>
                      {" "}
                      <button
                        className="catItem"
                        onClick={(e) => this.handleSortChange("priority", e)}
                      >
                        Priority
                      </button>
                    </p>
                    <p>
                      <button
                        className="catItem"
                        onClick={(e) => this.handleSortChange("status", e)}
                      >
                        Status
                      </button>
                    </p>
                    <p>
                      <button
                        className="catItem"
                        onClick={(e) =>
                          this.handleSortChange("requestedDate", e)
                        }
                      >
                        Request Date
                      </button>
                    </p>
                  </div>
                </div>
               */}
              </Col>
            </Row>

            <Row className="aln-left">
              <Col sm={4}>
                <button className="catItem" onClick={() => this.getByStatus(1)}>
                  Open
                </button>
              </Col>
              <Col sm={4}>
                <button className="catItem" onClick={() => this.getByStatus(2)}>
                  In Progress
                </button>
              </Col>
              <Col sm={4}>
                <button className="catItem" onClick={() => this.loadTickets()}>
                  All
                </button>
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col sm={12}>
                {this.state.tickets && this.state.tickets.length ? (
                  <div className="scroll-div">
                    <ListGroup className="ticket-list">
                      {this.state.tickets.map((ticket) => (
                        <ListGroup.Item
                          className="mycard-item"
                          key={ticket._id}
                        >
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
                                  <Link to={"/tickets/" + ticket._id}>
                                    See Details
                                  </Link>
                                </Col>
                              </Row>
                              <Row>
                                <Col>Category: {ticket.category}</Col>
                                <Col> {ticket.subCategory}</Col>
                                <Col className="aln-right">
                                  Status: {this.statusStr(ticket.status)}
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
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TicketPage;
