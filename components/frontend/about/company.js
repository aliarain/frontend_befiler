import React from 'react';


const CompanyCards = ({ aboutContent }) => {

    const portfolio = aboutContent?.photo_gallery;

    
    return (
        <div>
            <div className='flex justify-center my-10 md:my-32 container'>
                <div>
                    <div className='md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {
                            portfolio?.map((pic, index) => <div key={index + 1} className='card-flip'>
                                {/* company image */}
                                <div className="flip-box flip-box-height-portfolio">
                                    <div className="flip-box-inner">
                                        <div className="flip-box-front border">
                                            <img className='h-[300px] w-[300px]' src={pic?.image ?? ""} alt="" style={{objectFit: 'cover',objectPosition: '50% 0%'}}/>
                                        </div>
                                        {/* image related data */}
                                        <div className="flip-box-back flex justify-center items-center">
                                            <div className='text-center p-4'>
                                                <p className='font-bold text-xl'>{pic?.title ?? ""}</p>
                                                <p className='text-base mb-0 overflow-auto'>{pic?.deatils?.slice(0,250) ?? ""}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CompanyCards;