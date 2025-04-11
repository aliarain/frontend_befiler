import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiFillStar } from 'react-icons/ai';
import { getAllfeedBackAPI } from '../../../helpers/backend_helper';


const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
};


const Testimonials = () => {
    const [feedBack, setFeedBack] = useState([]);

    // feedback data calling
    useEffect(() => {
        getAllfeedBackAPI().then(data => {
            setFeedBack(data?.data?.docs);
        })
    }, [])

    return (
        <>
            <div className="bg-[#FAF7F6]">
                <div className="container items-center flex mt-12 pb-32" >
                    <div className="text-center w-full">
                        <h3 className="header_6 text-hover  text-center">Testimonial’s</h3>
                        <h3 className="header_2 text-center">
                            What Our Client Says
                            <br />
                            <span className="header_2 mt-[8px]"> about Us </span>
                        </h3>
                        <Slider {...settings}>
                            {
                                feedBack?.map((val) => {
                                    return (
                                        <div key={val._id}>
                                            <>
                                                <Card val={val} />
                                            </>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    )
}

const Card = ({ val }) => {
    return (
        <>
            <div className="carousel-item active relative float-left w-full">

                <img className="rounded-full shadow-lg m-7 mx-auto"
                    src={val?.user?.profile_img ? `${val?.user?.profile_img}` : '/v2/military.png'} alt="img" width={100} />

                <div className="flex flex-wrap justify-center">
                    <div className="grow-0 shrink-0 basis-auto w-full lg:w-8/12 px-[12px]">
                        <ul className="flex justify-center mb-0">
                            <li>
                                <AiFillStar className="w-[20px] h-[20px]" style={{ color: 'D58F76' }} />
                            </li>
                            <li>
                                <AiFillStar className="w-[20px] h-[20px]" style={{ color: 'D58F76' }} />
                            </li>
                            <li>
                                <AiFillStar className="w-[20px] h-[20px]" style={{ color: 'D58F76' }} />
                            </li>
                            <li>
                                <AiFillStar className="w-[20px] h-[20px]" style={{ color: 'D58F76' }} />
                            </li>
                            <li>
                                <AiFillStar className="w-[20px] h-[20px]" style={{ color: 'D58F76' }} />
                            </li>
                        </ul>
                        <p className="header_5 mt-6">
                            {val?.comment ?? ""}
                        </p>

                        {/* reviewer name */}
                        <div className="flex flex-wrap justify-center">
                            <div className="grow-0 shrink-0 basis-auto w-full lg:w-8/12">
                                <p className="mt-6 items-right px-6">
                                    ___________  <span className='header_5 text-center px-[12px]'>{val?.user?.username ?? ""}</span>
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Testimonials