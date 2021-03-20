import React, { Component } from "react";
import axios from "axios";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import TicketPage from "./pages/TicketPage";
import Navbar from "./components/navbar";
import LoginForm from "./components/LoginPage";
import Signup from "./components/SignUpPage";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    axios.get("/user/").then((response) => {
      console.log("Get user response: ");
      console.log(response.data);
      if (response.data.user) {
        console.log("Get User: There is a user saved in the server session: ");

        this.setState({
          loggedIn: true,
          username: response.data.user.username,
        });
      } else {
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          username: null,
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if logged in: */}
        {this.state.loggedIn && <p>Join the party, {this.state.username}!</p>}
        {/* Routes to different components */}
        <Route exact path="/" component={TicketPage} />
        <Route
          path="/login"
          render={() => <LoginForm updateUser={this.updateUser} />}
        />
        <Route path="/signup" render={() => <Signup />} />
      </div>
    );
  }
}

export default App;
// }
// const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => {
//   const userData = Session.getUserData();
//   const isLoggedIn = !!userData;
//   const role = userData ? userData.role : null;

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isLoggedIn ? (
//           allowedRoles.indexOf(role) > -1 ? (
//             <Component {...props} />
//           ) : (
//             <Redirect to="/" />
//           )
//         ) : (
//           <Redirect to="/login" />
//         )
//       }
//     />
//   );
// };

// ReactDOM.render(
//   <Router history={history}>
//     <Switch>
//       <Route path="/" exact component={TicketPage} />
//       <Route path="/tickets" exact component={TicketPage} />
//       <Route path="/login" exact component={LoginPage} />
//       <Route path="/signup" exact component={SignUpPage} />
//       <PrivateRoute
//         path="/admin"
//         exact
//         component={AdminPage}
//         allowedRoles={[ROLES.ADMIN]}
//       />
//       <PrivateRoute
//         path="/user"
//         exact
//         component={AdminPage}
//         allowedRoles={[ROLES.USER, ROLES.ADMIN]}
//       />
//     </Switch>
//   </Router>,
//   document.getElementById("root")
// );

// <div>
// <Sitebar data={this.state.authenticated} />
// <Switch>
//   <PropsRoute
//     exact
//     path="/"
//     component={Tickets}
//     toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()}
//   />
//   <LoggedOutRoute
//     path="/login"
//     component={LoginPage}
//     toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()}
//   />

//   <Route exact path="/signup">
//     <SignUpPage />
//   </Route>
//   <Route exact path="/tickets">
//     <Tickets />
//   </Route>
//   <Route exact path="/logout">
//     <LogoutFunction />
//   </Route>
//   <Route>
//     <NoMatch />
//   </Route>
// </Switch>
// </div>
