import React from 'react';
import Slider from "react-slick";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    pauseOnFocus: true,
    pauseOnDotsHover: true,
    arrows: false,
    responsive: [
        {
            breakpoint: 1300,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: false

            }
        },
        {
            breakpoint: 950,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 2,
                dots: false,
            }
        },
        {
            breakpoint: 810,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 2,
                dots: false,
            }
        },
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
            }
        }
    ]
};

const SinglePricing = ({ taxPriceData }) => {
    return (
        <>
            <Slider {...settings}>
                {
                    taxPriceData?.map((val) => {
                        return (
                            <>
                                <div key={val?._id} className="mt-[52px] lg:mt-16 mx-[20px]">
                                    <div className="md:w-[340px] md:h-[502px] lg:h-[502px] lg:w-[390px] transition ease-in-out delay-75 lg:mb-14 mb-12 rounded-xl shadow-xl hover:-translate-y-8 hover:scale-110 duration-150 hover:border-2 border-hover">
                                        <div className="py-[16px]">
                                           
                                                <h3 className="leading-[16px] header_5 text-[#292828] text-center">{`Tax fees if ${val?.user_role?.split('_').join(' ')}`}</h3>
                                                <img src="/v2/shop.png" alt="" className="mx-auto mt-[16px]" />
                                                <p className='items-start text-gray-500 pt-5 group-hover:text-white paragraph'></p>
                                                <ul className="list-disc list-inside mt-[16px] lg:pl-20 pl-12">
                                                    <li className="text-[#696161] paragraph">Tax Fees: {val.taxfees}</li>
                                                    <li className="text-[#696161] paragraph">Service Charges: {val.service_charges}</li>
                                                    <li className="text-[#696161] paragraph">Welcome Benefit: {val.welcome_benefit}</li>
                                                    {
                                                        val?.additional_fees?.map((val) => {
                                                            return <li key={val._id} className="text-[#696161] paragraph">{val.additional_fee_name}</li>
                                                        })
                                                    }
                                                </ul>
                                        </div>
                                    </div>
                                </div>

                            </>
                        )
                    })
                }
            </Slider>
        </>
    );
};

export default SinglePricing