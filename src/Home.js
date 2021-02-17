import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Home.css";
import Pusher from "pusher-js";
import axios from "./axios";
import { firebase } from "./firebase";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";

function Home() {
  var history = useHistory();

  const pusher = new Pusher("f2ccd03741a0cd0d0545", {
    cluster: "ap2",
  });

  const [shouldStart, setShouldStart] = useState(false);
  const [messages, setMessages] = useState([]);

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
      });
    }
  }, [shouldStart]);

  useEffect(() => {
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      alert(newMessage);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="home">
      <Sidebar />
      {messages && <Feed posts={messages} />}
      <Widgets />
    </div>
  );
}

export default Home;
