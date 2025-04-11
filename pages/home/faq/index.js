import React, { useEffect, useState } from 'react';
import { Collapse } from 'antd';
import { getAllFaqAPI } from '../../../helpers/backend_helper';
import Menu from '../../../components/frontend/menu/menu';
import Footer from '../../../components/frontend/shared/footer';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
const { Panel } = Collapse;


const FAQPage = () => {
    const [faqData, setFAQData] = useState();
    const router = useRouter();

    // fag data rendering
    useEffect(() => {
        getAllFaqAPI().then((data) => {
            setFAQData(data?.data?.docs);
        });
    }, []);


    return (
        <div>
            <Head>
                <title>FAQ</title>
            </Head>

            {/* main menu with sidebar */}
            <div className='lg:h-16 bg-white'>
                <Menu />
            </div>

            {/* header section data */}
            <div className='relative mb-[5%] second_header flex justify-center items-center'>
                <div className='container'>
                    <h1 className='text-center text-[34px] font-extrabold hero_font_family text-white'>FAQ&apos;s</h1>
                    <p className='text-[18px] text-center '>
                        <span className='cursor-pointer'>
                            <Link href="/"><a className={router.pathname === "/" ? " text-[#14AA40]" : "text-white"}>Home</a></Link>
                        </span>
                        <span className='text-white'> / </span>
                        <span className='cursor-pointer'>
                        <Link href="/home/faq"><a className={router.pathname === "/home/faq" ? "text-[#14AA40]" : "text-white"}>FAQ&apos;s</a></Link>
                        </span>
                    </p>
                </div>
            </div>

    
            {/* question display section */}
            <div className='container lg:flex lg:justify-end text-justify bg-no-repeat bg-center bg-cover bg-[url("/codecayonImage/bg1.png")]'>
                <div className=' h-[500px] lg:w-1/2 md:p-[5%] scrollbar '>
                    <Collapse ghost accordion={true} className=''>
                        {
                            faqData?.map((faq, i) =>
                                <Collapse.Panel className='border-b-2 border-red-500' header={faq?.question} key={i + 1}>
                                    <p className='text-[16px] px-[2%]'>{faq?.answer}</p>
                                </Collapse.Panel>
                            )
                        }
                    </Collapse>
                </div>
            </div>
            {/* footer */}
            <Footer />
        </div>
    );
};

export default FAQPage;