import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/omnihelp_bnr300px.png";
import "../App.css";

class Navbar extends Component {
  render() {
    console.log(this.props);
    return (
      <header className="navbar App-header" id="nav-container">
        <div className="left-pad-small">
          {this.props.isLoggedIn ? (
            <section className="navbar-section">
              <Link
                to="#"
                className="btn btn-link text-secondary"
                onClick={this.props.logout}
              >
                <span className="blue-text">Log Out</span>
              </Link>
            </section>
          ) : (
            <section className="navbar-section">
              <Link to="/login" className="btn btn-link text-secondary">
                <span className="blue-text">Log In</span>
              </Link>
              <Link to="/signup" className="btn btn-link text-secondary">
                <span className="blue-text">Sign Up</span>
              </Link>
            </section>
          )}
        </div>
        <div className="col-4 col-mr-auto">
          <div id="top-filler"></div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </header>
    );
  }
}

export default Navbar;
