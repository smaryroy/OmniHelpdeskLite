import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Route, Link } from "react-router-dom";
import logo from "../assets/img/omnihelp_bnr300px.png";
import "../App.css";
import axios from "axios";

class Navbar extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    console.log("logging out");
    axios
      .post("/user/logout")
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          this.props.updateUser({
            loggedIn: false,
            username: null,
          });
        }
      })
      .catch((error) => {
        console.log("Logout error");
      });
  }

  render() {
    const loggedIn = this.props.loggedIn;
    console.log("navbar render, props: ");
    console.log(this.props);

    return (
      <div>
        <header className="navbar App-header" id="nav-container">
          <div className="col-4">
            {loggedIn ? (
              <section className="navbar-section">
                <Link
                  to="#"
                  className="btn btn-link text-secondary"
                  onClick={this.logout}
                >
                  <span className="text-secondary">Log Out</span>
                </Link>
              </section>
            ) : (
              <section className="navbar-section">
                <Link to="/" className="btn btn-link blue-text">
                  <span className=" blue-text">Home</span>
                </Link>
                <Link to="/login" className="btn btn-link blue-text">
                  <span className="blue-text">Log In</span>
                </Link>
                <Link to="/signup" className="btn btn-link blue-text">
                  <span className="blue-text">Sign Up</span>
                </Link>
              </section>
            )}
          </div>
          <div className="col-4 col-mr-auto">
            <div id="top-filler"></div>
            <img src={logo} className="App-logo" alt="logo" />
            {/* <h1 className="App-title">O</h1> */}
          </div>
        </header>
      </div>
    );
  }
}

export default Navbar;