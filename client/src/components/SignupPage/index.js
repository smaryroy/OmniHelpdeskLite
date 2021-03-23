import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import AppButton from "../AppButton";
import axios from "axios";
import "./style.css";

class SignUpPage extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      message: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.props.updateUser(e.target.name, e.target.value);
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    axios
      .post("/auth/signup", { username, password })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("reg success");
          this.setState({ message: "" });
          this.props.gotoLogin();
        }
      })
      .catch((error) => {
        console.log("register error", error);
        this.setState({ message: "Registration failed: " + error });
      });
  };

  render() {
    const { username, password, message } = this.state;
    return (
      <Container className="myform">
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <h4>Sign Up</h4>

            <form onSubmit={this.handleSubmit}>
              {message !== "" && (
                <div class="alert alert-warning alert-dismissible" role="alert">
                  {message}
                </div>
              )}
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
                    value={username}
                    placeholder="username"
                    onChange={this.handleChange}
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
                    value={password}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-group ">
                <AppButton btnType="submit" label="Register"></AppButton>
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
