import React from 'react';
import OfferCard from '../../card/offerCard';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const settings = {
  className: "",
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  centerMode: false,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        centerMode: false,
        dots: true
      }
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 780,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      }
    }
  ]
};

const OfferServices = ({ siteData }) => {


  return (
    <div className='relative py-[5%] '>
      <div className='z-30 container '>
        <p className='text-center text-[#14AA40] mb-0 font-normal md:text-[18px] lg:text-[24px] capitalize hero_font_family'>our service</p>
        <p className='text-[24px] md:text-[34px] lg:text-[44px] text-center hero_font_family'>What Services We Offer</p>
        <Slider {...settings} >
          {
            siteData?.services?.map((offer, index) =>
              <OfferCard key={index + 1} offerCards={offer} />
            )
          }
        </Slider>
      </div>
      <div className='absolute -top-20' style={{ zIndex: "-1" }}>
        <img className='w-full h-[1200px]' src="/codecayonImage/group.png" alt="" />
      </div>
    </div>
  );
};

export default OfferServices;