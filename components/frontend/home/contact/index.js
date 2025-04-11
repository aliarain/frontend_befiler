import React from 'react';
import HomePageContactForm from '../../form/contactForm/homeForm ';


const HomePageContact = () => {
    // contact form custom style
    const fromStyle = [{
        bgcolor: 'white',
        textColor: 'black',
    }]


    return (
        <div className='bg-[#F6F6FC]  p-[3%] lg:h-[730px] mb-[5%]'>
            <div className='container relative'>
                <div className='lg:flex gap-3 '>
                    {/* side image */}
                    <div className='relative flex justify-center w-1/2'>
                        <img className='hidden lg:block absolute z-20 w-[500px] h-[500px]' src='/codecayonImage/contact.png' />
                        <img className='hidden lg:block absolute z-10 h-[100px] -left-10 xl:left-[5%] bottom-[25%] ' src='/codecayonImage/vector1.png' />
                    </div>
                    {/* section header data */}
                    <div className='w-full lg:w-1/2 h-full md:h-[750px] relative '>
                        <div className='lg:absolute z-20 bg-[#14AA40] hero_font_family flex justify-center w-full h-full  rounded-lg '>
                            <div className=' rounded-lg  m-[4%] p-4'>
                                <p className='text-xl mb-0 text-[#fff]'>Contact us</p>
                                <p className='text-3xl font-bold mb-3 text-[#fff]'>Send Us a Message</p>
                                <p className='text-base font-normal text-[#fff]'>Please do not hesitate to send us a message, We are looking forward to hearing from you! We reply within 24 hours.</p>
                                {/* form component rendering */}
                                <div className=''>
                                    {
                                        fromStyle.map((d, i) => <HomePageContactForm key={i + 1} color={d ?? ""} />)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <img className='hidden lg:block absolute z-10 -right-8 lg:-right-[3%] -top-10 ' src='/codecayonImage/triangle.png' />
            </div>
        </div>
    );
};

export default HomePageContact;