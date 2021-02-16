import React, { useState } from "react";
import "./Login.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";
import { TextField, Button } from "@material-ui/core";
import { firebase } from "./firebase";
import { useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  let history = useHistory();

  const loginUser = () => {
    if (email && password) {
      setDisableButton(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          history.push("home");
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      setDisableButton(false);
    }
  };

  return (
    <div className="login">
      <TwitterIcon className="login__twitterIcon" />
      <div className="loginContainer">
        <h1>Login</h1>
        <div className="formContainer">
          <form className="emailInputForm" noValidate autoComplete="off">
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              className="emailInput"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              className="passwordInput"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              className="registerButton"
              variant="outlined"
              color="primary"
              endIcon={<ArrowRightRoundedIcon />}
              disabled={disableButton}
              onClick={loginUser}
            >
              Continue
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
