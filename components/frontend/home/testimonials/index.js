import React, { useEffect, useState } from 'react';
import { getAllfeedBackAPI } from '../../../../helpers/backend_helper';
import TestimonialSlider from '../carousel/textimonialSlider';


const Testimonials = () => {
    const [feedBack, setFeedBack] = useState([]);

    // feedback data calling
    useEffect(() => {
        getAllfeedBackAPI().then(data => {
            setFeedBack(data?.data?.docs);
        })
    }, [])


    return (
        <div className='my-6 px-[10%] py-[5%] bg-[#F6F6FC] h-[500px] '>
            <div className='relative z-20 container md:flex justify-center items-center'>
                {/* teatimonial component rendering */}

                <TestimonialSlider feedBack={feedBack} />

                <div className='absolute -left-[10%] md:left-[5%] lg:left-[13%] -top-2 md:-top-[10%]  lg:-top-16  z-10'>
                    <img className='h-[80px] md:h-[100px] lg:h-full' src="/codecayonImage/vector4.png" alt="" />
                </div>
            </div>

        </div >
    );
};

export default Testimonials;