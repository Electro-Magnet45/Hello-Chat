import { Button } from "@material-ui/core";
import { firebase } from "./firebase";
import React from "react";
import "./Widgets.css";
import { useHistory } from "react-router-dom";

function Widgets() {
  let history = useHistory();
  const signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem("userData");
        history.push("/");
      });
  };
  return (
    <div className="widgets">
      <Button
        variant="outlined"
        className="signOutButton"
        onClick={signOutUser}
      >
        Sign Out
      </Button>
    </div>
  );
}

export default Widgets;
