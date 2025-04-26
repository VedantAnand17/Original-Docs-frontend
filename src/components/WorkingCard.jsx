import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    step: "Step 1",
    title: "Upload Document",
    description:
      "Upload your document (PDF, image, etc). The system will calculate a unique hash for your document.",
  },
  {
    step: "Step 2",
    title: "Generate Hash",
    description:
      "We use the keccak256 algorithm to generate a unique cryptographic hash that represents your document.",
  },
  {
    step: "Step 3",
    title: "Verify on Blockchain",
    description:
      "The system checks if your document hash exists on the blockchain using a smart contract.",
  },
  {
    step: "Step 4",
    title: "View Results",
    description:
      "See verification results including when the document was registered on the blockchain, if verified.",
  },
];

const WorkingCard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-white">
      {/* Heading */}
      <h1 className="text-gray-800 text-4xl font-bold mb-16 text-center">
        How's it working under the hood 🚀
      </h1>

      {/* Steps Section */}
      <div className="flex flex-col gap-24 w-full max-w-5xl">
        {steps.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col md:flex-row w-full gap-10 items-center md:items-stretch"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            {/* Left box (Step) */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-full md:w-2/5 bg-gray-100 p-10 rounded-3xl shadow-lg flex items-center justify-center overflow-hidden group border border-gray-200"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-100 via-purple-100 to-blue-100 animate-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h2 className="text-gray-800 text-3xl font-extrabold z-10 group-hover:text-gray-900 transition-colors duration-500">
                {item.step}
              </h2>
            </motion.div>

            {/* Right box (Title and Description) */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative w-full md:w-3/5 bg-gray-100 p-10 rounded-3xl shadow-lg flex flex-col justify-center overflow-hidden group border border-gray-200"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-100 via-purple-100 to-blue-100 animate-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <h3 className="text-gray-800 text-2xl font-semibold mb-4 group-hover:text-gray-900 transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed group-hover:text-gray-800 transition-colors duration-500">
                  {item.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WorkingCard;
