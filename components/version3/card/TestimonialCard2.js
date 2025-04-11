import { Rate } from 'antd';
import Image from 'next/image';
import React from 'react';

const TestimonialsCard2 = ({ data }) => {
    return (
        <div
            className="w-full h-[300px] mt-6 md:mt-0 p-6 z-50 flex flex-col"
            style={{ boxShadow: '0px 4px 20px 0px #00000014' }}
        >
            <Rate disabled defaultValue={data?.ratting} />
            <p className="speech mt-3 md:mt-4 lg:mt-5 text-justify">{data?.comment.slice(0, 100)}</p>

            {/* Spacer to push the content below */}
            <div className="flex-1"></div>

            <div className="mt-6 md:mt-8 lg:mt-10 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="rounded-full testimonials-person w-16 h-16">
                        {data?.user?.profile_img && (
                            <Image
                                className="rounded-full"
                                src={data?.user?.profile_img || "/v3/testimonial/1.svg"}
                                width={60}
                                height={60}
                                alt="person"
                            />
                        )}
                    </div>
                    <div>
                        <p className="text-xl font-bold">{data?.user?.firstName} {data?.user?.lastName}</p>
                        <p className="text-xl font-bold -mt-4">{data?.user?.role}</p>
                    </div>
                </div>
                <div className="hidden sm:flex">
                    <Image src="/v3/testimonial2/koma.svg" alt="icon" width={32} height={24} />
                </div>
            </div>
        </div>
    );
};


export default TestimonialsCard2;