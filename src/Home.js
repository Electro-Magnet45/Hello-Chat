import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Home.css";
import axios from "./axios";
import { firebase } from "./firebase";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";

function Home() {
  var history = useHistory();
  var URL = null;
  const [ws, setws] = useState(null);

  const [shouldStart, setShouldStart] = useState(false);
  const [messages, setMessages] = useState([]);

  const checkForUpdates = () => {
    URL = "wss://hello-chat.vercel.app/";
    setws(new WebSocket(URL));
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setShouldStart(true);
      } else {
        setShouldStart(false);
        history.push("/");
      }
    });
  }, []);

  useEffect(() => {
    if (shouldStart) {
      axios.get("api/sync").then((response) => {
        setMessages(response.data);
        checkForUpdates();
      });
    }
  }, [shouldStart]);

  useEffect(() => {
    if (ws) {
      ws.onopen = () => {
        console.log("connected");
      };

      ws.onerror = (err) => {
        console.log(err);
      };

      ws.onclose = () => {
        console.log("disconnected");
      };
    }
  }, [ws]);

  useEffect(() => {
    if (messages) {
      if (ws) {
        ws.onmessage = (evt) => {
          var newMessage = JSON.parse(evt.data);
          setMessages([newMessage, ...messages]);
        };
      }
    }
  }, [messages, ws]);

  return (
    <div className="home">
      <Sidebar />
      {messages && <Feed posts={messages} />}
      <Widgets />
    </div>
  );
}

export default Home;
