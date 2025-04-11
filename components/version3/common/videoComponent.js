import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
    infinite: true,
    className: "",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
            }
        },
        {
            breakpoint: 1000,
            settings: {
                slidesToShow: 1,
            }
        },
        {
            breakpoint: 780,
            settings: {
                slidesToShow: 1,
            }
        }
    ]
};
const VideoComponent = ({ siteData }) => {
    
    return (
        <div className=''>
            <Slider {...settings} >
                {
                    siteData?.file_tax_videos?.map((url, i) =>
                        <div key={i + 1} className=' flex justify-center rounded video_class' >
                          <div className='lg:h-[400px] w-[536px] lg:w-auto' style={{objectFit:'contain'}} dangerouslySetInnerHTML={{ __html: url ?? "" }}></div>
                        </div>
                    )
                }
            </Slider>
        </div>
    );
};

export default VideoComponent;