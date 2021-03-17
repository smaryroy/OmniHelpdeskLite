import React, { Component } from "react";
import {
  Navbar, //1
  NavbarBrand,
} from "reactstrap";

import logo from "../../assets/img/omnihelp_bnr300px.png";
import "./nav.css";

class SiteBar extends Component {
  constructor(props) {
    //2
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Navbar className="header" light expand="md">
        <NavbarBrand href="/">
          <img src={logo} alt="OmniHelpdeskLite Logo" />
        </NavbarBrand>
      </Navbar>
    );
  }
}

export default SiteBar;
