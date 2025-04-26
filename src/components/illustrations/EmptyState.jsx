import React from 'react';

const EmptyStateIllustration = ({ className = '' }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 400 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M200 150C200 150 180 130 150 130C120 130 100 150 100 150C100 150 120 170 150 170C180 170 200 150 200 150Z"
        fill="#E6E6E6"
      />
      <path
        d="M300 150C300 150 280 130 250 130C220 130 200 150 200 150C200 150 220 170 250 170C280 170 300 150 300 150Z"
        fill="#E6E6E6"
      />
      <path
        d="M200 200C227.614 200 250 177.614 250 150C250 122.386 227.614 100 200 100C172.386 100 150 122.386 150 150C150 177.614 172.386 200 200 200Z"
        fill="#3B82F6"
        opacity="0.1"
      />
      <path
        d="M200 180C216.569 180 230 166.569 230 150C230 133.431 216.569 120 200 120"
        stroke="#3B82F6"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default EmptyStateIllustration;