import React, { useState } from "react";
import "./Home.css";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";

function Home() {
  return (
    <div className="home">
      <Sidebar />
      <Feed />
      <Widgets />
    </div>
  );
}

export default Home;
