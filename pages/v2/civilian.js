import React, { useState, useEffect } from 'react';
import HomeLayout from '../../layout/home';
import WhyUs from '../../components/version2/home/whyus';
import Coupon from '../../components/version2/common/coupon';
import Section from '../../components/version2/common/section';
import { getSiteHomeAPI} from '../../helpers/backend_helper';


const cData = {
    title: 'Whether you want a Tax Expert’s help or to do it yourself, we’ve got a discount for you.',
    btnText: 'Get Coupon',
}

const Civilian = ({ taxSituationData, serviceData }) => {
    const [siteData, setSiteData] = useState({});

    useEffect(() => {
        getSiteHomeAPI().then((data) => {
            setSiteData(data?.data);
        })
    }, [])

    return (
        <>
            <div className="bg-background -mt-20">
                <div className="container2 mx-auto">
                    <h1 className='header_2 text-center pt-16' >Hi {serviceData?.display_name}</h1>
                </div>
                <div className='container2 hero_font_family'>
                    <div className='py-16'>
                        <div className="">

                            <Section taxSituation={taxSituationData} />

                        </div>
                    </div>
                </div>
            </div>

            <div className="">
                <Coupon cData={cData} serviceData={serviceData} />
            </div>

            <div className="">
                <WhyUs siteData={siteData} />
            </div>
        </>
    );
};

Civilian.layout = HomeLayout;
export default Civilian;
