import Image from 'next/image';
import React from 'react';

const TestimonialCard3 = ({ data }) => {
    return (
        <div className="flex flex-col h-[400px]">
            <div className="rounded-full w-20 h-20 mx-auto relative top-10">
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
            <div className="h-1 divider"> </div>
           
            <div className="bg-[#012A2B]  flex-1 rounded-xl flex flex-col items-center justify-center px-4">
                <p className="testimonials-text text-center">
                    {data?.comment.slice(0, 100)}
                </p>
                <h3 className="team-name pt-8 md:pt-10 lg:pt-12">
                    {data?.user?.firstName} {data?.user?.lastName}
                </h3>
                <p className="team-title pb-8 md:pb-10 lg:pb-12">{data?.user?.role}</p>
            </div>
            <div className=" h-1 divider"> </div>
        </div>
    );
};

export default TestimonialCard3;

