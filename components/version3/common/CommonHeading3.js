import React from 'react';

const CommonHeading3 = ({ heading1, heading2, textColor = 'text-[#fff]', bgClass = 'white' , align = 'left', marginX =''  }) => {
    return (
        <div className= {`text-${align} `}>
            <p className={`text-${textColor} w-fit capitalize text-left text-lg font-medium  mx-${marginX} py-2  ${bgClass}`}>
                {heading1}
            </p>
            <h2 className={`text-${textColor} text-2xl lg:text-5xl font-semibold mt-4`}>
                {heading2}
            </h2>
        </div>
    );
};

export default CommonHeading3;