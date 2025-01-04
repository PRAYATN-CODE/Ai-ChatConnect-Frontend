import React from "react";

const SendMessageIcon = ({ width = 30, height = 30, color = "#ffffff" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill="black"
    >
      <circle cx="12" cy="12" r="10" stroke="#000000" strokeWidth="1.5" />
      <path
        d="M12 8L12 16M12 8C11.2998 8 9.99153 9.9943 9.5 10.5M12 8C12.7002 8 14.0085 9.9943 14.5 10.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SendMessageIcon;
