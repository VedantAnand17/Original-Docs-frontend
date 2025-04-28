import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Logo = ({ className = "" }) => {
  return (
    <Link
      to="/"
      className={`flex items-center gap-2 ${className} hover:opacity-80 transition-opacity`}
    >
      <motion.svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.path
          d="M7 18H17V16H7V18Z"
          fill="currentColor"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        />
        <motion.path
          d="M17 14H7V12H17V14Z"
          fill="currentColor"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        />
        <motion.path
          d="M7 10H11V8H7V10Z"
          fill="currentColor"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        />
        <motion.path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM5 5C5 4.44772 5.44772 4 6 4H14C16.7614 4 19 6.23858 19 9V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5Z"
          fill="currentColor"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        />
      </motion.svg>
      <motion.span
        className="text-xl font-bold"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        Veri-Doc
      </motion.span>
    </Link>
  );
};

export default Logo;
