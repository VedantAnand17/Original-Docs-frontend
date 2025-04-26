import React from 'react';
import styled from 'styled-components';

const Button = ({ className }) => {
  return (
    <StyledWrapper className={className}>
      <button className="button">
        <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="26px"><path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" fill="currentColor"  /></svg>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    display: flex;
    justify-content: center;
    color: #fff;
    width: 80px;
    height: 80px;
    border-radius: 100%;
    background: #3949ab;
    transition: all 0.3s ease-in-out 0s;
    box-shadow: rgba(193, 244, 246, 0.698) 0px 0px 0px 0px;
    animation: 1.2s cubic-bezier(0.8, 0, 0, 1) 0s infinite normal none running pulse;
    align-items: center;
    border: 0;
   
  }

  .button:is(:hover, :focus) {
    transform: scale(1.2);

  }

  @keyframes pulse {
    100% {
      box-shadow: 0 0 0 45px rgba(193,244,246,0);
    }
  }`;

export default Button;
