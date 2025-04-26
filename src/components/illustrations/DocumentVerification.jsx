import React from 'react';

const DocumentVerificationIllustration = ({ className = '' }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 500 500" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M350 150H150C137.85 150 128 159.85 128 172V428C128 440.15 137.85 450 150 450H350C362.15 450 372 440.15 372 428V172C372 159.85 362.15 150 350 150Z"
        fill="#E6E6E6"
      />
      <path
        d="M320 50H120C107.85 50 98 59.85 98 72V328C98 340.15 107.85 350 120 350H320C332.15 350 342 340.15 342 328V72C342 59.85 332.15 50 320 50Z"
        fill="#FFFFFF"
        stroke="#3B82F6"
        strokeWidth="4"
      />
      <path
        d="M282 196H158C154.686 196 152 198.686 152 202C152 205.314 154.686 208 158 208H282C285.314 208 288 205.314 288 202C288 198.686 285.314 196 282 196Z"
        fill="#3B82F6"
      />
      <path
        d="M282 236H158C154.686 236 152 238.686 152 242C152 245.314 154.686 248 158 248H282C285.314 248 288 245.314 288 242C288 238.686 285.314 236 282 236Z"
        fill="#3B82F6"
      />
      <circle cx="220" cy="140" r="30" fill="#3B82F6" opacity="0.2"/>
      <path
        d="M235 132L215 152L205 142"
        stroke="#3B82F6"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DocumentVerificationIllustration;