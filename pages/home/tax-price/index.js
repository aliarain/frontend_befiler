import React, { useEffect, useState } from 'react';
import { Collapse } from 'antd';
import Footer from '../../../components/frontend/shared/footer';
import Menu from '../../../components/frontend/menu/menu';
import { getAllTaxPricingFrontendAPI } from '../../../helpers/backend_helper';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
const { Panel } = Collapse;


const TaxPricePage = () => {
    const router = useRouter();
    const [taxPriceData, setTaxPriceData] = useState();

    // all tax file data rendering
    useEffect(() => {
        getAllTaxPricingFrontendAPI().then((data) => {
            setTaxPriceData(data?.data);
        });
    }, []);



    return (
        <div className=' hero_font_family'>
            <Head>
                <title>Tax Pricing</title>
            </Head>

            {/* main menu with sidebar */}
            <div className='lg:h-16 bg-white'>
                <Menu />
            </div>

            {/* page header */}
            <div className='relative  second_header flex justify-center items-center'>
                <div className='container'>
                    <h1 className='text-center text-[34px] font-extrabold hero_font_family text-white'>Tax pricing</h1>
                    <p className='text-[18px] text-center '>
                        <span className='cursor-pointer'>
                            <Link href="/"><a className={router.pathname === "/" ? " text-[#14AA40]" : "text-white"}>Home</a></Link>
                        </span>
                        <span className='text-white'> / </span>
                        <span className='cursor-pointer'>
                            <Link href="/home/tax-price"><a className={router.pathname === "/home/tax-price" ? "text-[#14AA40]" : "text-white"}>Pricing</a></Link>
                        </span>
                    </p>
                </div>
            </div>


            {/* price display section */}
            <div className='my-[5%]'>
                <div className='container lg:flex lg:justify-end lg:p-[5%] text-justify bg-no-repeat bg-center bg-cover bg-[url("/codecayonImage/bg1.png")]'>
                    <div className=' h-[300px] lg:w-1/2 md:p-[5%] scrollbar'>
                        <Collapse ghost accordion={true} className=''>
                            {
                                taxPriceData?.map((price, i) =>
                                    <Panel className='border-b-2 border-red-500' header={`Tax fees if ${price?.user_role?.split('_').join(' ')}`} key={i + 1}>
                                        <ul className='list-disc text-[16px] px-10'>
                                            <li><p>Tax Fees: {price?.taxfees}</p></li>
                                            <li><p>Service Charges: {price?.service_charges}</p></li>
                                            <li><p>Welcome Benefit: {price?.welcome_benefit}</p></li>
                                            <li><p>Additional Fess:</p>
                                                {price?.additional_fees?.map((fee, ind) =>
                                                    <ul key={ind + 1} className='list-disc'>
                                                        <li ><p>{fee?.additional_fee_name?.split('_').join(' ')}: {fee?.additional_fee}</p></li>
                                                    </ul>
                                                )}
                                            </li>
                                        </ul>
                                    </Panel>
                                )
                            }
                        </Collapse>
                    </div>
                </div>
            </div>
            
            {/* footer */}
            <Footer />
        </div>
    );
};

export default TaxPricePage;