import React from "react";
// import {Upload, Working, Tutorial} from
import Tutorial from "../components/Tutorial";
import Upload from "../components/Upload";
import Working from "../components/Working";
import { NoiseDemo } from "@/components/Cursor";
import Verify from "@/components/Verify";

function Home() {
  return (
    // <NoiseDemo>
    <div className="bg-[#020223]">
      <Upload />
      <Working />
      <Tutorial />
      <Verify />
    </div>
  );
}

export default Home;
