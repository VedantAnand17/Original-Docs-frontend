import React from 'react';
import Form from './UploadIcon';
function Upload() {
  return (
    <div className="bg-[#020223] h-[120vh]">
      <div className ="text-[#98C1D9] justify-center flex flex-col items-center font-bold text-6xl font-sans py-11.5">Welcome to Veri-Doc</div>
      <div className="text-[#c5cae9] mt-4 justify-center flex flex-col items-center text-3xl">
                        Authentic at Heart. Original by Nature. Verified by Truth
      </div>
      <div className="flex justify-center pt-24 ">
         <Form/>
        
      </div>
    </div>
  )
}

export default Upload;
