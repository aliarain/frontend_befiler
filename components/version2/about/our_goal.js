import React from 'react';

const OurGoal = ({aboutContent}) => {
    return (
        <>
            <div className='-mt-32 flex flex-col items-center'>
            <div className="lg:h-[702px] md:w-[640px] lg:w-[1280px] h-[700px] lg:px-10 px-6 bg-no-repeat bg-center " style={{ backgroundImage: `url('../../v2/img/BG.png')` }}>
                <div className="md:flex-col lg:flex-row sm:flex-row flex flex-col justify-between">
                    <div className="flex flex-col pt-10 pb-10 md:pt-24 md:pb-24 lg:pt-64 lg:pb-72">
                        <div className="header_2 text-white md:w-fit lg:w-fit w-fit">
                        Our Company Goal
                        </div>
                        <div className="paragraph text-white lg:w-[480px] w-fit pt-8">
                        {aboutContent?.our_goal}
                        </div>
                    </div>
                    <div className=" md:mt-24 md:mb-24 lg:mt-40 lg:w-[375.56px] lg:h-[390.12px] w-fit h-fit">
                        <img src="/v2/goal.png" alt="taxstick" />
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default OurGoal;