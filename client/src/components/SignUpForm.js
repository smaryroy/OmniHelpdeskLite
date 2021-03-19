import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
import "./styles.css";

const SignUpForm = ({ onSubmit, onChange, errors, user }) => (
  <div>
    <Container className="auth-container">
      <Row style={{ marginTop: 50 }} className="login-col">
        <Col md="2"></Col>
        <Col md="8" className="login">
          <div>
            <h1>Sign Up</h1>
            <h5>
              Welcome to Omni HelpDesk Lite!
              <br /> Please Register:
            </h5>
            <Form action="/" onSubmit={onSubmit}>
              {errors.summary && (
                <p className="error-message">{errors.summary}</p>
              )}
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  id="li_name"
                  type="text"
                  name="name"
                  placeholder="enter name"
                  onChange={onChange}
                  value={user.name}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  id="li_email"
                  type="text"
                  name="email"
                  placeholder="enter email"
                  onChange={onChange}
                  value={user.email}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  id="li_password"
                  type="password"
                  name="password"
                  placeholder="enter password"
                  onChange={onChange}
                  value={user.password}
                />
              </FormGroup>
              <Button type="submit"> Create New Account </Button>
              <h4>
                Already have an account? <Link to={"/login"}>Log in</Link>
              </h4>
            </Form>
          </div>
        </Col>
        <Col md="2"></Col>
      </Row>
    </Container>
  </div>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default SignUpForm;
