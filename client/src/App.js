import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import "./App.scss";

// Containers
import { DefaultLayout } from "./containers";
// Pages
import { Login, Register } from "./views/Pages";

// import { renderRoutes } from 'react-router-config';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Switch>
            <Route exact path="/" name="Login Page" component={Login} />
            <Route exact path="/login" name="Login Page" component={Login} />
            <Route
              exact
              path="/register"
              name="Login Page"
              component={Register}
            />
            <Route
              exact
              path="/dashboard"
              name="Home"
              component={DefaultLayout}
            />
          </Switch>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
