import React from 'react';
import { useState } from 'react';


const ServiceFileExport = ({ siteData }) => {
    const [sliceData, setSliceData] = useState(null);

    // associate data
    const data = {
        img: "/codecayonImage/file3.png",
        title: 'Choose Your Way To File Taxes',
        subtitle: 'File with an expart',
    }


    return (
        <div className='container flex justify-center items-center p-[5%] '>
            {/* tittle and subtitle section */}
            <div className='relative hero_font_family'>
                <p className='text-center text-[#14AA40] mb-0 font-normal md:text-[18px] lg:text-[24px] capitalize hero_font_family'>{data?.subtitle}</p>
                <h1 className='text-center  text-[24px] md:text-[34px] lg:text-[44px] hero_font_family'>{data?.title}</h1>
                {/* main card section */}
                <div className='flex justify-center items-center '>
                    <div className='md:grid md:grid-cols-2 lg:grid-cols-3 place-items-center gap-[5%] mt-6'>
                        {
                            siteData?.way_to_file_tax?.map((file, index) =>
                                <div key={index + 1} className='z-20 bg-white mt-2 md:mt-0 rounded p-2 xl:p-10  h-[400px] w-[320px] border-[1px] border-[#DDDDDD] odd:shadow even:shadow-lg'>

                                    <div className='relative flex justify-center  items-center h-[150px] '>
                                        <div className='absolute top-[20%] left-[34%] z-10 w-20 h-20 shadow rounded bg-[#14AA40]'></div>
                                        <img className=' rounded w-20 h-20 z-20 bg-white shadow p-2' style={{ objectFit: 'cover', objectPosition: '50% 0%' }} src={file?.image ?? "/codecayonImage/file3.png"} alt="" />
                                    </div>
                                    <div className='hero_font_family h-[220px]  p-2'>
                                        {
                                            index === 1 ?
                                                <h3 className='text-[18px] md:text-[20px] text-center hero_font_family text-[#14AA40]'>{file?.title ?? ""}</h3>
                                                :
                                                <h3 className='text-[18px] md:text-[20px] text-center hero_font_family'>{file?.title ?? ""}</h3>
                                        }
                                        <div className={`h-[150px] ${sliceData === file?._id && "scrollbar"}`}>
                                            <p className={`text-[14px] md:text-[16px] mb-0 text-justify `}>
                                                {
                                                    (sliceData === file?._id) ?
                                                        file?.description
                                                        :
                                                        file?.description?.slice(0, 150)
                                                }
                                            </p>
                                            {
                                                (sliceData !== file?._id) && <p className='text-[#14AA40] cursor-pointer text-right' onClick={() => setSliceData(pre => pre = file?._id)}>More...</p>
                                            }
                                        </div>
                                    </div>

                                </div>
                            )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceFileExport;