import React, { useEffect, useState } from "react";
import "./Home.css";
import Pusher from "pusher-js";
import axios from "./axios";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";

function Home() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("api/sync").then((response) => {
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

  return (
    <div className="home">
      <Sidebar />
      {messages && <Feed posts={messages} setPosts={setMessages} />}
      <Widgets />
    </div>
  );
}

export default Home;
