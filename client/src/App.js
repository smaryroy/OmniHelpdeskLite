import React, { Component } from "react";
import axios from "axios";
import { Switch, Route, withRouter } from "react-router-dom";
import TicketPage from "./components/TicketPage";
import Sitebar from "./components/Sitebar";
import LoginPage from "./components/LoginPage";
import Signup from "./components/SignupPage";
import TicketEdit from "./components/TicketEdit";
import "./App.css";

class App extends Component {
  state = {
    isLoggedIn: false,
    username: null,
    password: null,
    ticketId: null,
  };

  componentDidMount() {
    this.getUser();
  }

  updateUser = (updatedProp, update) => {
    this.setState((prevState) => ({ ...prevState, [updatedProp]: update }));
  };

  updateTicketId = (updatedProp, update) => {
    console.log("updateticketid", updatedProp, update);
    this.setState((prevState) => ({ ...prevState, [updatedProp]: update }));
    console.log(this.state.ticketId);
  };

  getUser = () => {
    console.log("in getUser");
    axios.get("/user").then((response) => {
      if (response.data.user) {
        this.setState({
          isLoggedIn: true,
          username: response.data.user.username,
        });
      }
    });
  };

  gotoMain = () => {
    console.log("in gotomain", this.state);
    this.props.history.push("/tickets");
  };

  gotoLogin = () => {
    console.log("in gotoLogin", this.state);
    this.props.history.push("/login");
  };

  logout = () => {
    console.log("in logout");
    axios
      .post("/auth/logout")
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            isLoggedIn: false,
            username: null,
            password: null,
          });
        }
      })
      .catch((error) => {
        console.log("logout error", error);
      });
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="App">
        <Sitebar isLoggedIn={this.state.isLoggedIn} logout={this.logout} />
        <Switch>
          <Route
            exact
            path="/tickets"
            render={() => (
              <TicketPage
                isLoggedIn={this.state.isLoggedIn}
                username={this.state.username}
                gotoLogin={this.gotoLogin}
                openDetail={this.openDetail}
                updateTicketId={this.updateTicketId}
              />
            )}
          />
          <Route
            exact
            path="/tickets/:id"
            render={() => (
              <TicketEdit
                isLoggedIn={this.state.isLoggedIn}
                gotoLogin={this.gotoLogin}
              />
            )}
          />
          <Route
            exact
            path="/newticket"
            render={() => (
              <TicketEdit
                isLoggedIn={this.state.isLoggedIn}
                gotoLogin={this.gotoLogin}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={() => (
              <LoginPage
                updateUser={this.updateUser}
                gotoMain={this.gotoMain}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={() => (
              <LoginPage
                username={this.state.username}
                updateUser={this.updateUser}
                gotoMain={this.gotoMain}
              />
            )}
          />
          <Route
            path="/signup"
            render={() => (
              <Signup
                username={this.state.username}
                updateUser={this.updateUser}
                gotoMain={this.gotoMain}
              />
            )}
          />
          {/* <Route
            path="/page"
            render={() => (
              <Page
                isLoggedIn={this.state.isLoggedIn}
                username={this.state.username}
              />
            )}
          /> */}
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
