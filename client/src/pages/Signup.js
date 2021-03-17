import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
import "./styles.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      useremail: "",
      password: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    console.log(this.state);
    fetch("http://localhost:3000/api/user", {
      method: "POST",
      body: JSON.stringify({ user: this.state }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.props.setToken(data.sessionToken);
      });
    event.preventDefault();
  };

  render() {
    return (
      <Container>
        <Row style={{ marginTop: 50 }}>
          <Col md="2"></Col>
          <Col md="8" className="login">
            <div>
              <h1>Sign Up</h1>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="useremail">Email</Label>
                  <Input
                    id="useremail"
                    type="text"
                    name="useremail"
                    placeholder="enter email"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    id="su_password"
                    type="password"
                    name="password"
                    placeholder="enter password"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <Button type="submit"> Submit </Button>
              </Form>
            </div>
          </Col>
          <Col md="2"></Col>
        </Row>
      </Container>
    );
  }
}

export default Signup;
