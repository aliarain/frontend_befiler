import React from 'react';

const CommonHeading2 = ({ heading1, heading2, textColor = '#090909', bgClass = 'white' , align = 'left', marginX =''  }) => {
    return (
        <div className= {`text-${align} `}>
            <p className={`text-[${textColor}] w-fit capitalize text-left text-lg font-medium rounded-full border-[1px] border-[#10B981] mx-${marginX} py-2 px-4 ${bgClass}`}>
                {heading1}
            </p>
            <h2 className={`text-[${textColor}] text-2xl lg:text-5xl font-semibold mt-4`}>
                {heading2}
            </h2>
        </div>
    );
};

export default CommonHeading2;