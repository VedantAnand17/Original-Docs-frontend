import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    step: "Step 1",
    title: "Title 1",
    description: "This is the description for Step 1.",
  },
  {
    step: "Step 2",
    title: "Title 2",
    description: "This is the description for Step 2.",
  },
  {
    step: "Step 3",
    title: "Title 3",
    description: "This is the description for Step 3.",
  },
  {
    step: "Step 4",
    title: "Title 4",
    description: "This is the description for Step 4.",
  },
];

const WorkingCard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      {/* Heading */}
      <h1 className="text-white text-4xl font-bold mb-16 text-center">
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
              className="relative w-full md:w-2/5 bg-gray-950 p-10 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden group border border-gray-800"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#6b21a8] via-[#4f46e5] to-[#6b21a8] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h2 className="text-white text-3xl font-extrabold z-10 group-hover:text-black transition-colors duration-500">
                {item.step}
              </h2>
            </motion.div>

            {/* Right box (Title and Description) */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative w-full md:w-3/5 bg-gray-950 p-10 rounded-3xl shadow-2xl flex flex-col justify-center overflow-hidden group border border-gray-800"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#6b21a8] via-[#4f46e5] to-[#6b21a8] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <h3 className="text-white text-2xl font-semibold mb-4 group-hover:text-black transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-base leading-relaxed group-hover:text-black transition-colors duration-500">
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
