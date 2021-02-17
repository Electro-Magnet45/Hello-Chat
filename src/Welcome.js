import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { firebase } from "./firebase";
import "./Welcome.css";

function Welcome() {
  var history = useHistory();

  const [shouldStart, setShouldStart] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        setShouldStart(true);
      } else {
        setShouldStart(false);
        history.push("/home");
      }
    });
  }, []);

  return (
    <div>
      <h1>welcome</h1>
    </div>
  );
}

export default Welcome;
