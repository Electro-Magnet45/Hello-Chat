import React from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import FlipMove from "react-flip-move";

function Feed({ posts }) {
  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <TweetBox />

      <FlipMove
        staggerDelayBy={150}
        enterAnimation={{
          from: {
            transform: "rotateX(180deg)",
            opacity: 0.1,
          },
          to: {
            transform: "",
          },
        }}
        leaveAnimation={{
          from: {
            transform: "",
          },
          to: {
            transform: "rotateX(-120deg)",
            opacity: 0.1,
          },
        }}
      >
        {posts &&
          posts.map((post) => {
            return (
              <Post
                key={post.text}
                displayName={post.displayName}
                userName={post.userName}
                verified={post.verified}
                text={post.text}
                avatar={post.avatar}
                image={post.image}
              />
            );
          })}
      </FlipMove>
    </div>
  );
}

export default Feed;
