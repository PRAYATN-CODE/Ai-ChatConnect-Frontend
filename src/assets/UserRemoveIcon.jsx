import React from 'react';

const UserRemoveIcon = ({ color = '#ffffff', size = 35, ...props }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            color={color}
            {...props}
        >
            <path
                d="M11.9959 18H12.0049"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />


            <path
                d="M11.9959 12H12.0049"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.9998 6H12.0088"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />


        </svg>
    );
};

export default UserRemoveIcon;
