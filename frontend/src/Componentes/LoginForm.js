import React from "react";
import PropTypes from "prop-types";

class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
    loggedIn: false,
  };

  handle_change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    if (this.props.loggedIn) {
      return (
        <button className="btn btn-danger" onClick={this.props.handle_logout}>
          Logout
        </button>
      );
    } else {
      return (
        <form onSubmit={(e) => this.props.handle_login(e, this.state)}>
          <h2 className="fw-bold text-center py-2">Iniciar Sesión</h2>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="username">
              Username
            </label>
            <input
              className="form-control"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handle_change}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handle_change}
            />
          </div>
          <input className="btn btn-primary" type="submit" />
        </form>
      );
    }
  }
}

export default LoginForm;

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired,
};
