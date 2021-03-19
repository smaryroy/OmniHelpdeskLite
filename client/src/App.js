import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
} from "react-router-dom";
import { browserHistory } from "react-router";
import Tickets from "./pages/Tickets";
import LoginPage from "./pages/LoginPage.js";
import Auth from "./modules/Auth";
import Sitebar from "./components/Sitebar";
import SignUpPage from "./pages/SignUpPage.js";
import LogoutFunction from "./pages/LogoutFunction.js";
import NoMatch from "./pages/NoMatch";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      Auth.isUserAuthenticated() ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const LoggedOutRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      Auth.isUserAuthenticated() ? (
        <Redirect
          to={{
            pathname: "/tickets",
            state: { from: props.location },
          }}
        />
      ) : (
        <Component {...props} {...rest} />
      )
    }
  />
);

const PropsRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => <Component {...props} {...rest} />} />
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
    };
  }

  componentDidMount() {
    // check if user is logged in on refresh
    this.toggleAuthenticateStatus();
  }

  toggleAuthenticateStatus() {
    // check authenticated status and toggle state based on that
    this.setState({ authenticated: Auth.isUserAuthenticated() });
  }

  render() {
    return (
      <Router>
        <div>
          <Sitebar data={this.state.authenticated} />
          <Switch>
            <Route exact path={["/", "/login"]}>
              <LoginPage
                toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()}
              />
            </Route>
            <Route exact path="/signup">
              <SignUpPage />
            </Route>
            <Route exact path="/tickets">
              <Tickets />
            </Route>
            <Route exact path="/logout">
              <LogoutFunction />
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
