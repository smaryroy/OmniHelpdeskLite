import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
import "./styles.css";

class Login extends Component {
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
      <div>
        <Container>
          <Row style={{ marginTop: 50 }}>
            <Col md="2"></Col>
            <Col md="8" className="login">
              <div>
                <h1>Login</h1>
                <h5>
                  Welcome to Omni HelpDesk Lite!
                  <br /> Please log in with your registered email and password.
                </h5>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="useremail">Email</Label>
                    <Input
                      id="li_email"
                      type="text"
                      name="useremail"
                      placeholder="enter email"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      id="li_password"
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
      </div>
    );
  }
}
export default Login;
