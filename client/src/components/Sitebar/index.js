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
        {/* <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar> */}
        <Nav className="ml-auto" navbar>
          <NavItem>
            <div>
              {props.authenticated ? (
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
        {/* </Collapse> */}
      </Navbar>
    </div>
  );
}

export default Sitebar;
