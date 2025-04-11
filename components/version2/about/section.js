import React, { useRef } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';


const Section = ({aboutContent}) => {
    const ref = useRef();
    const gallery = aboutContent?.photo_gallery;
    return (
        <>
            <div className="container mx-auto lg:pt-40 pt-[12px]">
            <img src="/v2/v1.png" alt="taxstick" className='w-[375.56px] h-[390.12px] lg:block hidden -mt-40 right-0 mr-36 absolute'/>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-6 gap-4 ">
                    {
                        gallery?.map((item, i) => (
                            <div className="md:mx-0 mx-auto" key={i + 1}>
                            <Flippy
                                
                                flipOnHover={true}
                                flipDirection="horizontal"
                                ref={ref} 
                                style={{ width: '310.5px', height: '310.5px' }}
                                className="flex justify-center items-center"
                            >

                                <FrontSide style={{ padding:'0' }}>
                                    <div className=''>
                                        <img className='h-[320px] w-[320px] object-cover' src={item?.image ?? ""} alt="taxstick" />

                                    </div>
                                </FrontSide>
                                <BackSide style={{ backgroundColor: '#292828' }} >
                                    <div className="text-white flex-col justify-center text-center">
                                        <h3 className='header_3'>{item?.title}</h3>
                                        <p className='paragraph'>{item?.deatils}</p>
                                    </div>
                                </BackSide>

                            </Flippy>
                            </div>
                        )
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default Section;