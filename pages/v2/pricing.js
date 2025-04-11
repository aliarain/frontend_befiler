import React, {useEffect, useState} from 'react';
import Banner from '../../components/version2/common/banner';
import Contact from '../../components/version2/home/contact';
import Brands from '../../components/version2/home/brands';
import HomeLayout from '../../layout/home';
import SinglePricing from '../../components/version2/home/singlePricing';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useRouter} from 'next/router';
import {getAllTaxPricingFrontendAPI} from '../../helpers/backend_helper';


const Pricing = () => {
    const router = useRouter();
    const [taxPriceData, setTaxPriceData] = useState();

    // all tax file data rendering
    useEffect(() => {
        getAllTaxPricingFrontendAPI().then((data) => {
            setTaxPriceData(data?.data);
        });
    }, []);

    return (
        <>
            <Banner name="Pricing" title="Home" sub_title="Pricing"/>
            <div className="py-28 -mt-20 bg-[#FAF7F6] h-[962px]">
                <h1 className='header_2 text-black text-center'>Pricing Plan</h1>
                <div className="container2 mx-auto pb-20 pt-5 lg:pt-14 px-4">
                    <SinglePricing taxPriceData={taxPriceData}/>
                </div>
            </div>
            <Contact/>
            <Brands/>
        </>
    );
};

Pricing.layout = HomeLayout
export default Pricing;



