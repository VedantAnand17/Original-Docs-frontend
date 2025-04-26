import React from 'react';

const BlockchainVerificationIllustration = ({ className = '' }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 500 500" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M250 100L350 150V250L250 300L150 250V150L250 100Z"
        fill="#3B82F6"
        opacity="0.1"
      />
      <path
        d="M250 100L350 150V250L250 300L150 250V150L250 100Z"
        stroke="#3B82F6"
        strokeWidth="4"
      />
      <circle cx="250" cy="200" r="40" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="4"/>
      <path
        d="M265 192L245 212L235 202"
        stroke="#3B82F6"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M150 350L250 400L350 350"
        stroke="#3B82F6"
        strokeWidth="4"
        strokeDashed="true"
      />
      <circle cx="150" cy="350" r="20" fill="#3B82F6" opacity="0.2"/>
      <circle cx="250" cy="400" r="20" fill="#3B82F6" opacity="0.2"/>
      <circle cx="350" cy="350" r="20" fill="#3B82F6" opacity="0.2"/>
    </svg>
  );
};

export default BlockchainVerificationIllustration;