import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
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


const Members = ({ aboutContent }) => {
    const teamMembers = aboutContent?.executive_team;

    return (
        <>
            <div className='bg-[#FAF7F6] pt-16 pb-10 -mt-32'>
                <div className='py-16'>
                    <div className='lg:grid lg:grid-cols-2 text-justify p-[2%] justify-items-center lg:justify-items-end'>
                        <div className='w-[350px] lg:w-[434px] mr-40'>
                            <h3 className='header_6 text-hover'>Our Team</h3>
                            <h1 className="focus:outline-none header_2 mt-[8px]">
                                Meet Our
                                <br />
                                Expert Member
                            </h1>
                            <p className="focus:outline-none mt-[20px] paragraph text-secondary_gray w-[355px] md:w-fit text-justify">
                                Taxstick Inc. is a platform that helps in connecting students to accountants.
                                It is an easy to use web app that allows students to submit documents to accountants for tax filing and other related services
                            </p>
                        </div>
                        <div className='w-full'>
                            <Slider {...settings}>
                                {
                                    teamMembers?.map((member) => {
                                        return (
                                            <Team member={member} key={member?._id} />

                                        )
                                    })
                                }
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const Team = ({ member }) => {
    const team = member?.user;
    return (
        <>
            <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow">
                <div className="pt-12 pb-12">
                    <div className="flex justify-center z-0">
                        <img src={team.image} alt="taxstick" className="rounded-full group-hover:rounded-[100px] w-[230px] h-[230px] xl:w-[270px] xl:h-[270px] transform transition duration-500 group-hover:scale-y-125" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent"></div>
                    <div className="absolute inset-0 flex translate-y-[62%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                        <h1 className="text-center header_5 text-[#FAF7F6] pb-[8px] mb-28 lg:mb-24 lg:pb-8">{team.first_name} {team.last_name}</h1>
                        <div className="flex space-x-2 lg:space-x-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                           
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Members
