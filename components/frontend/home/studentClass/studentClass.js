import React from 'react';


const StudentClass = ({ siteData }) => {

    return (
        <div className='container  flex justify-center py-10 '>
            {/* section header data */}
            <div className=''>
                <p className='text-[16px] lg:text-[20px] text-center text-[#14AA40] capitalize hero_font_family'>More Information</p>
                <p className='text-[18px] md:text-[24px] lg:text-[34px] mx-2 font-semibold text-center  hero_font_family'>Out of these three which everyone want to be?</p>
                <div className='flex justify-center'>
                    {/* video display section */}
                    <div className='lg:flex justify-center gap-3'>
                        {
                            siteData?.student_class_videos?.map((video, index) =>
                                <div key={index + 1} className=' p-2 lg:my-2 lg:w-[300px] lg:h-[200px] '>
                                    <div className='student_video' style={{objectFit:'contain'}} dangerouslySetInnerHTML={{ __html: video ?? "" }}></div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentClass;