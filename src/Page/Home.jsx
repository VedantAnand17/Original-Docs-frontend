import React from "react";
import Tutorial from "../components/Tutorial";
import Working from "../components/Working";
import Client from "../components/Client";
import { TimelineDemo } from "@/components/TimelineDemo";

function Home() {
  return (
    <div className="bg-white">
      <Client />
      <TimelineDemo />
      {/* <Working /> */}
      <Tutorial />
    </div>
  );
}

export default Home;
