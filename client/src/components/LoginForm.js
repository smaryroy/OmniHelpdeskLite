import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
import "./styles.css";

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user,
  toggleAuthenticateStatus,
}) => (
  <div>
    <Container className="auth-container">
      <Row style={{ marginTop: 50 }} className="login-col">
        <Col md="2"></Col>
        <Col md="8" className="login">
          <div>
            <h1>Login</h1>
            <h5>
              Welcome to Omni HelpDesk Lite!
              <br /> Please log in with your registered email and password.
            </h5>
            <Form action="/" onSubmit={onSubmit}>
              {successMessage && (
                <p className="success-message">{successMessage}</p>
              )}
              {errors.summary && (
                <p className="error-message">{errors.summary}</p>
              )}
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
              <Button type="submit"> Submit </Button>
            </Form>
          </div>
        </Col>
        <Col md="2"></Col>
      </Row>
    </Container>
  </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default LoginForm;
