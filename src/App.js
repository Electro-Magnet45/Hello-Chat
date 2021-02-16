import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Home from "./Home";
import Welcome from "./Welcome";
import Pusher from "pusher-js";
import axios from "./axios";
import { Button } from "@material-ui/core";

function App() {
  const [messages, setMessages] = useState([]);

  /* const syncDb = async () => {
    const response = await (await fetch("/api/sync")).json();

    return response;
  }; */

  useEffect(() => {
    axios.get("api/sync").then((response) => {
      console.log(response.data);
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("f2ccd03741a0cd0d0545", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  const handleClick = () => {
    axios.post("api/new", {
      displayName: "messageDetails.displayName",
      userName: "messageDetails.userName",
      verified: false,
      text: "messageDetails.text",
      avatar: "messageDetails.avatar",
      image: "messageDetails.image",
    });
  };

  return (
    <div className="app">
      <Button onClick={handleClick}>Insrt data</Button>
      <Router>
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
