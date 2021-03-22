import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class SignUpPage extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.props.updateUser(event.target.name, event.target.value);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.register();
  };

  render() {
    return (
      <Container className="myform">
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <h4>Sign Up</h4>

            <form>
              <div className="form-group">
                <div className="col-1 col-ml-auto">
                  <label className="form-label" htmlFor="username">
                    Username
                  </label>
                </div>
                <div className="col-3 col-mr-auto">
                  <input
                    className="form-input"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-1 col-ml-auto">
                  <label className="form-label" htmlFor="name">
                    Name
                  </label>
                </div>
                <div className="col-3 col-mr-auto">
                  <input
                    className="form-input"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="name"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-1 col-ml-auto">
                  <label className="form-label" htmlFor="password">
                    Password:{" "}
                  </label>
                </div>
                <div className="col-3 col-mr-auto">
                  <input
                    className="form-input"
                    placeholder="password"
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-group ">
                <button
                  className="btn subBtn "
                  onClick={this.handleSubmit}
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </Col>
          <Col md={2}></Col>
        </Row>
      </Container>
    );
  }
}

export default SignUpPage;
