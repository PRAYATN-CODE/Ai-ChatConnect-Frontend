import React from 'react';

const AddIcon = ({ color = "#000000", width = 24, height = 24 }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={width}
            height={height}
            fill="none"
        >
            <path
                d="M12 8V16M16 12H8"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle
                cx="12"
                cy="12"
                r="10"
                stroke={color}
                strokeWidth="1.5"
            />
        </svg>
    );
};

export default AddIcon;
