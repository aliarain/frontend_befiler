import { Rate } from 'antd';
import Image from 'next/image';
import React from 'react';

const TestimonialCard = ({ data }) => {
    return (
        <div className="w-full bg-white h-[300px] shadow mt-6 md:mt-0 p-5 md:p-6 lg:p-10 z-50">
            <div className="w-full flex items-center justify-between">
                <Image src='/v3/testimonial/koma.svg' height={30} width={41} alt="coma" />
                <Rate className='text-[#FFC000]' disabled defaultValue={data?.ratting} />
            </div>
            <p className="speech mt-3 md:mt-5 lg:mt-[30px] text-justify">{data?.comment.slice(0, 100)}</p>
            <div className="flex-1"></div>
            <div className="mt-6 md:mt-9 lg:mt-[50px] flex items-center space-x-4">
                <div className='rounded-full testimonials-person w-16 h-16'>
                    {
                        data?.user?.profile_img && (
                            <Image
                                className="rounded-full"
                                src={data?.user?.profile_img || "/v3/testimonial/1.svg"}

                                width={60}
                                height={60}
                                alt="person"
                            />
                        )
                    }

                </div>

                <div className='flex flex-col justify-center mt-3'>
                    <p className="text-xl font-bold ">{data?.user?.firstName} {data?.user?.lastName}</p>
                    <p className="text-xl font-bold -mt-4 ">{data?.user?.role}</p>

                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;