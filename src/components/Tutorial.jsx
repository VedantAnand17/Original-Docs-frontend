import React, { useState } from "react";

function Tutorial() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-4">
          🎥 Watch The Tutorial
        </h2>
        <p className="text-lg text-gray-600">
          Learn how to get started easily and quickly!
        </p>
      </div>

      {/* Video Container */}
      <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl">
        {!isPlaying ? (
          <div className="relative">
            {/* Thumbnail (first frame of video) */}
            <video
              className="w-full rounded-2xl"
              poster="https://res.cloudinary.com/dduzorsii/video/upload/v1745706793/Screencast_from_2025-04-27_03-51-08_oouivt.jpg"
            >
              <source
                src="https://res.cloudinary.com/dduzorsii/video/upload/v1745706793/Screencast_from_2025-04-27_03-51-08_oouivt.mp4"
                type="video/mp4"
              />
            </video>

            {/* Play Button Overlay */}
            <button
              onClick={handlePlayVideo}
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-50 transition-all duration-300"
            >
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 hover:scale-110 transition-all duration-300">
                <svg
                  className="w-10 h-10 text-blue-600 translate-x-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.84A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.27l9.344-5.891a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </button>
          </div>
        ) : (
          <video className="w-full rounded-2xl" controls autoPlay>
            <source
              src="https://res.cloudinary.com/dduzorsii/video/upload/v1745706793/Screencast_from_2025-04-27_03-51-08_oouivt.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Optional Note */}
      <p className="text-gray-500 text-sm mt-8">
        Click the play button to watch the full tutorial video
      </p>
    </div>
  );
}

export default Tutorial;
