import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    pauseOnFocus: true,
    pauseOnDotsHover: true,
    arrows: false,
};


const TaxFilingVideo = ({siteData}) => {
    return (
        <div>
            <Slider {...settings}>
            {
                siteData?.file_tax_videos?.map((val, i) => {
                    return (
                        <>
                        <div dangerouslySetInnerHTML={{ __html: val ?? "" }}></div>
                        </>
                    );
                })
            }
            </Slider>
        </div>
    );
};

export default TaxFilingVideo;