import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import SiteBar from "./components/Sitebar";
import Tickets from "./pages/Tickets";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

class App extends Component {
  constructor() {
    super();
    this.state = {
      sessionToken: "", //1
    };
  }

  componentWillMount() {
    const token = localStorage.getItem("token"); //4
    if (token && !this.state.sessionToken) {
      //5
      this.setState({ sessionToken: token });
    }
  }
  //2
  setSessionState = (token) => {
    localStorage.setItem("token", token); //3
    this.setState({ sessionToken: token });
  };

  render() {
    return (
      <Router>
        <div>
          <SiteBar />
          <Switch>
            <Route exact path={["/", "/login"]}>
              <Login setToken={this.setSessionState} />
            </Route>
            <Route exact path={["/signup"]}>
              <Signup setToken={this.setSessionState} />
            </Route>
            <Route exact path={["/", "/tickets"]}>
              <Tickets />
            </Route>
            <Route exact path="/tickets/:id">
              <Detail />
            </Route>
            <Route>
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
