import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Menu from '../../../components/frontend/menu/menu';
import Footer from '../../../components/frontend/shared/footer';
import { getOneFrontPageAPI } from '../../../helpers/backend_helper';
import { TbGridDots } from 'react-icons/tb';
import Head from 'next/head';
import { useEnv } from '../../../contexts/envContext';


const FrontEndPage = () => {
    const [_, environmentVariable] = useEnv();
    const router = useRouter();
    const [frontPageData, setFrontPageData] = useState();
    const { query } = router;

    // single page data rendering
    useEffect(() => {
        getOneFrontPageAPI(query).then((data) => {
            setFrontPageData(data?.data);
        });
    }, [query, query.id]);


    return (
        <div>
            <Head>
                <title>{environmentVariable?.website_name}</title>
            </Head>

            {/* main menu with sidebar */}
            <div className='lg:h-16'>
                <Menu />
            </div>
            {/* page header section */}
            <div className='relative  second_header flex justify-center items-center'>
                <div className='container'>
                    <h1 className='text-center text-[34px] font-extrabold hero_font_family text-white'>{frontPageData?.name ?? ""}</h1>
                    <p className='text-[18px] text-center '>
                        <span className='cursor-pointer'>
                            <Link href="/"><a className={router.pathname === "/" ? " text-[#14AA40]" : "text-white"}>Home</a></Link>
                        </span>
                        <span className='text-white'> / </span>
                        <span className='cursor-pointer text-[#14AA40]'> {frontPageData?.name ?? ""}</span>
                    </p>
                </div>
            </div>

            {/* page inner component */}
            <div className='flex justify-around py-[6%] text-justify'>
                <div className='container'>
                    <p className='text-xl font-bold capitalize text-[#14AA40] flex items-center gap-2'><span><TbGridDots /></span> {frontPageData?.name ?? ""}</p>
                    <p className='front_page_css' dangerouslySetInnerHTML={{ __html: frontPageData?.contents ?? "" }}></p>
                </div>
            </div>

            {/* footer */}
            <Footer />
        </div>
    );
};

export default FrontEndPage;