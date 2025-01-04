import React from "react";

const SlideBar = ({ color = "bg-blue-600", height = "h-1" }) => {
    return (
        <div
            className={`absolute top-0 left-0 rounded-full bg-blue-700 h-2 animate-slide z-20`}
            style={{ width: "100%" }}
        ></div>
    );
};

export default SlideBar;
