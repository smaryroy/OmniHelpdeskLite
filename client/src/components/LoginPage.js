import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.props.updateUser(event.target.name, event.target.value);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.login();
    this.setState({
      //redirect
      redirect: true,
    });
  };

  render() {
    // if (this.state.redirect) {
    //   // return <Redirect push to="/tickets" />;
    // } else {
    return (
      <div className="myform">
        <h4>Login</h4>
        <form className="form-horizontal">
          <div className="form-group">
            <div className="col-1 col-ml-auto">
              <label className="form-label" htmlFor="username">
                Username
              </label>
            </div>
            <div className="col-3 col-mr-auto">
              <input
                className="form-input"
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-1 col-ml-auto">
              <label className="form-label" htmlFor="password">
                Password:{" "}
              </label>
            </div>
            <div className="col-3 col-mr-auto">
              <input
                className="form-input"
                placeholder="password"
                type="password"
                name="password"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group ">
            <div className="col-7"></div>
            <button
              className="btn btn-primary col-1 col-mr-auto"
              onClick={this.handleSubmit}
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
    //}
  }
}

export default LoginForm;
