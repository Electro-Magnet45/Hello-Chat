import React, { useEffect, useState } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import axios from "axios";
import { firebase } from "./firebase";

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [files, setFiles] = useState("");
  const [showAvatar, setShowAvatar] = useState(false);

  var userId;
  var userData;
  var shouldGetUserId = true;

  firebase.auth().onAuthStateChanged(function (user) {
    userId = user.uid;

    userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      console.log(userId);
      if (shouldGetUserId === true) {
        shouldGetUserId = false;
        axios
          .post("api/findUser", {
            userId: userId,
          })
          .then((response) => {
            let userData = response.data;
            localStorage.setItem("userData", JSON.stringify(userData));
            userData = JSON.parse(localStorage.getItem("userData"));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  });

  var formData = new FormData();

  function insertToDatabase(tweetImage) {
    axios
      .post("api/new", {
        displayName: userData.displayName,
        userName: userData.userName,
        verified: userData.verified,
        text: tweetMessage,
        avatar: userData.avatar,
        image: tweetImage,
      })
      .then(() => {
        setTweetMessage("");
      });

    /* db.collection("posts")
      .add({
        displayName: userData.displayName,
        userName: userData.userName,
        verified: userData.verified,
        text: tweetMessage,
        avatar: userData.avatar,
        image: tweetImage,
        timeStamp: forDate.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setTweetMessage("");
      }); */
  }

  const sendTweet = (e) => {
    e.preventDefault();
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
          var tweetImage = res.secure_url;
          insertToDatabase(tweetImage);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      var tweetImage = "";
      insertToDatabase(tweetImage);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShowAvatar(true);
    }, 1000);
  }, []);

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          {showAvatar && (
            <Avatar src={JSON.parse(localStorage.getItem("userData")).avatar} />
          )}
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's Happening?"
            type="text"
          />
        </div>
        <input type="file" onChange={(e) => setFiles(e.target.files)} />

        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
