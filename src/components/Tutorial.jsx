import React from 'react';
import Button from './ui/Button';

function Tutorial() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-5xl font-extrabold text-white mb-4">
          🎥 Watch The Tutorial
        </h2>
        <p className="text-lg text-rose-100">
          Learn how to get started easily and quickly!
        </p>
      </div>
          


          
            <Button className="pt-14"/>
          
      
          {/* Optional Note */}
          <p className="text-gray-500 text-sm pt-14">
            Click the button to open the full tutorial video!
          </p>
        </div>
   
    
  );
}

export default Tutorial;