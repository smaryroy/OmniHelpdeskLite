import React, { Component } from "react";
import axios from "axios";
import { Switch, Route, withRouter } from "react-router-dom";
import TicketPage from "./components/TicketPage";
import Navbar from "./components/navbar";
import LoginForm from "./components/LoginPage";
import Signup from "./components/SignUpPage";
import "./App.css";

class App extends Component {
  state = {
    isLoggedIn: false,
    username: null,
  };

  componentDidMount() {
    this.getUser();
  }

  updateUser = (updatedProp, update) => {
    this.setState((prevState) => ({ ...prevState, [updatedProp]: update }));
  };

  getUser = () => {
    console.log("in getUser");
    axios.get("/user").then((response) => {
      if (response.data.user) {
        this.setState({
          isLoggedIn: true,
          username: response.data.user.username,
        });
      } else {
        this.setState({
          isLoggedIn: false,
          username: null,
        });
      }
    });
  };

  register = async () => {
    const { username, password } = this.state;
    axios
      .post("/signup", { username, password })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            isLoggedIn: true,
            username: username,
          });
          this.props.history.push("/login");
        }
      })
      .catch((error) => {
        console.log("register error", error);
      });
  };

  login = async () => {
    const { username, password } = this.state;
    console.log("in app login");
    axios
      .post("/login", { username, password })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.setState({
            isLoggedIn: true,
            username: username,
          });
          this.props.history.push("/tickets");
        }
      })
      .catch((error) => {
        console.log("login error", error);
      });
  };

  logout = () => {
    axios
      .post("/logout")
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            isLoggedIn: false,
            username: null,
            password: null,
          });
          this.props.history.push("/login");
        }
      })
      .catch((error) => {
        console.log("logout error", error);
      });
  };

  render() {
    console.log("state", this.state);
    return (
      <div className="App">
        <Navbar isLoggedIn={this.state.isLoggedIn} logout={this.logout} />
        <Switch>
          <Route
            exact
            path="/tickets"
            render={() => (
              <TicketPage
                isLoggedIn={this.state.isLoggedIn}
                username={this.state.username}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={() => (
              <LoginForm
                username={this.state.username}
                updateUser={this.updateUser}
                login={this.login}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={() => (
              <LoginForm
                username={this.state.username}
                updateUser={this.updateUser}
                login={this.login}
              />
            )}
          />
          <Route
            path="/signup"
            render={() => (
              <Signup
                username={this.state.username}
                updateUser={this.updateUser}
                register={this.register}
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
