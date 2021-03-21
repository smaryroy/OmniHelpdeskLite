import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
} from "reactstrap";

import logo from "../../assets/img/omnihelp_bnr300px.png";
import "./nav.css";

export function Sitebar(props) {
  return (
    <div>
      <Navbar className="header" light expand="md">
        <NavbarBrand href="/">
          <img src={logo} alt="OmniHelpdeskLite Logo" />
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <div>
              {this.props.isLoggedIn ? (
                <div>
                  <Link to="/logout" className="btn btn-primary">
                    Logout
                  </Link>
                </div>
              ) : (
                <div>
                  <Link to="/signup" className="btn btn-primary">
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default Sitebar;
