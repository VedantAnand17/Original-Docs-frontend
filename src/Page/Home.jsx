import React from "react";
import Tutorial from "../components/Tutorial";
import Client from "../components/Client";
import { TimelineDemo } from "@/components/TimelineDemo";

function Home() {
  return (
    <div className="bg-white">
      <Client />
      <TimelineDemo />
      <Tutorial />
    </div>
  );
}

export default Home;
