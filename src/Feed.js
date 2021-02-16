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

      <FlipMove>
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
