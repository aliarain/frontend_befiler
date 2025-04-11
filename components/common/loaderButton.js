import React from 'react';
import DotLoader from "react-spinners/DotLoader";

const LoaderButton = ({loadingRequest, children, className}) => {
    return (
        <div className={`relative ${className}`}>
            {children}
            {
                loadingRequest &&
                <span className="absolute top-0 left-[40%]">
                    <DotLoader width='200' color="purple" size={25}/>
                </span>
            }
        </div>
    );
};

export default LoaderButton;