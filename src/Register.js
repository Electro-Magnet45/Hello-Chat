import React, { useEffect, useState } from "react";
import "./Register.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";
import { TextField, Button } from "@material-ui/core";
import { firebase } from "./firebase";
import { useHistory } from "react-router-dom";
import axios from "./axios";

function Register() {
  const [shouldStart, setShouldStart] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [files, setFiles] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  let history = useHistory();
  var formData = new FormData();

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

  function insertUserData(userId, avatar) {
    axios
      .post("api/insertUser", {
        email: email,
        userId: userId,
        displayName: name,
        userName: userName,
        verified: false,
        avatar: avatar,
      })
      .then((response) => {
        if (response.status === 201) {
          history.push("home");
        } else {
          console.log(response);
        }
      });
  }

  function uploadAvatar(userId) {
    if (files[0]) {
      formData.append("file", files[0]);

      formData.append("upload_preset", "j2cq4uw4");
      const options = {
        method: "POST",
        body: formData,
      };

      fetch("https://api.Cloudinary.com/v1_1/drcxef0qi/image/upload", options)
        .then((res) => res.json())
        .then((res) => {
          var avatar = res.secure_url;
          insertUserData(userId, avatar);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const registerUser = () => {
    if (email && password) {
      setDisableButton(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          var userId = user.user.uid;
          uploadAvatar(userId);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      setDisableButton(false);
    }
  };

  return (
    <div className="register">
      <TwitterIcon className="register__twitterIcon" />
      {shouldStart && (
        <div className="registerContainer">
          <h1>Register</h1>
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
              <TextField
                label="Full Name"
                type="test"
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="User Name"
                type="text"
                variant="outlined"
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                placeholder="Avatar"
                type="file"
                onChange={(e) => setFiles(e.target.files)}
              />
              <Button
                className="registerButton"
                variant="outlined"
                color="primary"
                endIcon={<ArrowRightRoundedIcon />}
                disabled={disableButton}
                onClick={registerUser}
              >
                Continue
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
