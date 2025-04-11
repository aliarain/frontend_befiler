import Image from 'next/image';
import Link from 'next/link';

const Experience = ({siteData}) => {
    const data = siteData?.corporate_strategy;
    const ImageWithDecoration = ({ src, alt, decoration, decorationClass, containerClass }) => (
        <div className={`relative ${containerClass}`}>
            <div className=" z-10 relative ">
                <Image src={src} alt={alt} height={850} width={652} className="w-full xl:max-w-[320px] h-full xl:max-h-[400px] rounded" />
            </div>
            {decoration && (
                <div className={`w-[194px] h-[194px] z-0 hidden xl:flex absolute ${decorationClass}`}>
                    <Image src={decoration} alt="Decoration" height={194} width={194} />
                </div>
            )}
        </div>
    );

    return (
        <div className='overflow-hidden experience -mt-28 pt-24'>
            <div className="max-w-[1320px] mx-auto px-4 md:px-0 pb-12 relative ">
                <div className='hidden xl:flex justify-end  ml-auto -mr-28 -mt-0 w-[58px] h-[56px] '><Image src='/v3/experience/triangle.svg' alt="Decoration" height={198} width={198} /></div>
                <div className="flex flex-col lg:flex-row justify-between items-center space-y-10 lg:space-y-0 lg:gap-10 xl:ap-[72px] ">
                    <div className="w-full  flex flex-col md:flex-row gap-4 ">
                        <ImageWithDecoration
                            src={data?.img1}
                            alt="First Image"
                            decoration="/v3/experience/decaration.svg"
                            decorationClass="bottom-5 left-14"
                        />

                        <div className="relative">

                            <div className="bg-[#10B981] h-[90px]  z-10 relative py-4 px-4 flex items-center space-x-5 border-[3px] border-white rounded-[10px] mb-8">
                                <Image src="/v3/experience/like.svg" alt="Like Icon" height={54} width={54} className="rounded-xl" />
                                <div className="flex items-center mt-2 space-x-5">
                                    <h4 className="heading48">+25</h4>
                                    <h4 className="font-semibold text-lg capitalize text-white">years experience</h4>
                                </div>
                            </div>


                            <ImageWithDecoration
                                src={data?.img2}
                                alt="Second Image"
                                decoration="/v3/experience/ellipse.svg"
                                decorationClass=" -top-24 left-14"
                            />
                        </div>
                    </div>

                    <div className="w-full text-left">
                        <h2 className="text-3xl lg:text-2xl xl:text-4xl font-semibold mb-6">{data?.title}</h2>
                        <p className="paragraph mb-2 xl:mb-4">
                            {data?.description}
                        </p>
                        <p className="paragraph mb-4 xl:mb-6 border-l-[3px] pl-3 border-[#10B981]">
                            {data?.section1_des}
                        </p>
                        <div className="flex space-x-10">
                            {[
                                { text: `${data?.section1}`, icon: '/v3/experience/arrow.svg' },
                                { text: `${data?.section2}`, icon: '/v3/experience/arrow.svg' },
                            ].map((item, idx) => (
                                <div className="flex space-x-2 items-center" key={idx}>
                                    <Image src={item.icon} alt="Icon" height={24} width={24} className="h-6 w-6" />
                                    <h3 className="text-lg font-semibold mt-1">{item.text}</h3>
                                </div>
                            ))}
                        </div>
                        <div className="border-t my-4 xl:my-8 border-gray-300 h-1 max-w-[599px]"></div>
                        <Link href="/v3/about">
                            <a className="button !text-primary hover:!text-white py-3 md:py-[22px] px-4 md:px-10">
                                about more
                            </a>
                        </Link>
                    </div>
                </div>
                <div className='hidden xl:flex   ml-auto -mr-48 -mt-40 w-[196px] h-[196px] '><Image src='/v3/experience/circle.svg' alt="Decoration" height={198} width={198} /></div>

            </div>
        </div>
    );
};

export default Experience;
