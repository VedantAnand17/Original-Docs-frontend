import React from 'react'
// import {Upload, Working, Tutorial} from 
import Tutorial from './../components/Tutorial';
import Upload from './../components/Upload';
import Working from './../components/Working';
import { NoiseDemo } from '@/components/Cursor';


function Home() {
  return (
    // <NoiseDemo>
    <div className="bg-[#020223]">
      <Upload />
      <Working />
      <Tutorial/>
    </div>
  )
}

export default Home
