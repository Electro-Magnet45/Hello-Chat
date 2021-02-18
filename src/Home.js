import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Home.css";
import { db, firebase, forDate } from "./firebase";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";

function Home() {
  var history = useHistory();

  const [shouldStart, setShouldStart] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(async () => {
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
      const collection = db.collection("posts").orderBy("timeStamp", "desc");
      collection.onSnapshot(
        (snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        },
        (err) => {
          console.log(`Encountered error: ${err}`);
        }
      );
    }
  }, [shouldStart]);

  return (
    <div className="home">
      <Sidebar />
      {messages && <Feed posts={messages} />}
      <Widgets />
    </div>
  );
}

export default Home;
