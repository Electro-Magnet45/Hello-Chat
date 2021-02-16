import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { firebase } from "./firebase";
import "./App.css";
import Login from "./Login";
import Home from "./Home";
import Welcome from "./Welcome";

function App() {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    console.log(loggedIn);
  }, [loggedIn]);

  const redirectNone = () => {
    if (loggedIn) {
      return <Redirect to="/home" />;
    } else {
      return <Welcome />;
    }
  };

  const redirectHome = () => {
    if (loggedIn) {
      return <Home />;
    } else {
      return <Redirect to="/" />;
    }
  };

  const redirectLogin = () => {
    if (loggedIn) {
      return <Redirect to="/home" />;
    } else {
      return <Login />;
    }
  };

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            {redirectNone}
          </Route>
          <Route path="/home">{redirectHome}</Route>
          <Route path="/login">{redirectLogin}</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
