import React from 'react';

const CommonHeading = ({ heading1, heading2, textColor = 'text-[#090909]', bgClass = 'expertHeading' , align = 'center', marginX ='mx-auto'  }) => {
    return (
        <div className= {`text-${align} `}>
            <p className={`${textColor} w-[250px] capitalize text-left text-lg font-medium rounded ${marginX} py-2 px-4 ${bgClass}`}>
                {heading1}
            </p>
            <h2 className={`${textColor} !text-2xl lg:text-5xl font-semibold mt-4`}>
                {heading2}
            </h2>
        </div>
    );
};

export default CommonHeading;



