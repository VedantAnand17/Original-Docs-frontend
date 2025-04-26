import React from "react";

const steps = [
  {
    id: 1,
    title: "Upload",
    description: "You can drag or drop the file ",
  },
  {
    id: 2,
    title: "Verify",
    description: "Click on the verify button to verify",
  },
];
const Verify = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 text-white">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-center mb-16">How to Verify?</h1>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 bg-white w-1 h-full z-[1] "></div>

          {/* Steps */}
          <div className="flex flex-col space-y-20 z-[10]">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center justify-between">
                {/* Odd steps */}
                {step.id % 2 !== 0 ? (
                  <>
                    <div className="w-5/12 text-right border border-white p-8 rounded-md flex justify-content flex-col items-center ">
                      <h2 className="text-xl font-semibold">{step.title}</h2>
                      <p className="mt-2 text-gray-400">{step.description}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-[#0097a7] flex items-center justify-center text-white font-bold">
                        {step.id}
                      </div>
                    </div>
                    <div className="w-5/12"></div>
                  </>
                ) : (
                  // Even steps
                  <>
                    <div className="w-5/12"></div>
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-[#0097a7] flex items-center justify-center text-white font-bold">
                        {step.id}
                      </div>
                    </div>
                    <div className="w-5/12 text-left border border-white p-8 rounded-md flex justify-content items-center flex-col">
                      <h2 className="text-xl font-semibold">{step.title}</h2>
                      <p className="mt-2 text-gray-400">{step.description}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
