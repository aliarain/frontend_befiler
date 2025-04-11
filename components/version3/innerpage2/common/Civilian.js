import React from 'react';
import SectionHeader from '../../innerpage3/common/SectionHeader';
import TaxSituation from './TaxSituations'
import Coupon from './Coupon';
import ExpertFile2 from '../../home2/ExpertFile2';

const Civilian = ({ siteData, serviceData, taxSituationData }) => {

    return (
        <div>
            <SectionHeader heading='Tax Beneficiary' title={serviceData?.display_name} heading2='Home' bgImage="/v3/InnerPage/About/bg2.svg" />
            <div className=' max-w-[1320px] mx-auto mt-20 mb-20 px-6 xl:px-0'>
                <h1 className='text-3xl md:text-[48px] font-semibold text-[#1C2539]'>Hello {serviceData?.display_name} </h1>
            </div>
            <div className='experience2 xl:-mt-56 '>
                <TaxSituation  image={taxSituationData?.hero_section_image} title={taxSituationData?.hero_section_title} paragraph={taxSituationData?.hero_section_title_Sub_title}/></div>
            <div className='experience !my-10' >
                <TaxSituation image={taxSituationData?.section_2_image} title={taxSituationData?.section_2_title} paragraph={taxSituationData?.section_2_sub_title} position="md:flex-row-reverse" />
            </div>
            <div className='experience pb-28' >
                <TaxSituation image={taxSituationData?.section_3_image} title={taxSituationData?.section_3_title} paragraph={taxSituationData?.section_3_sub_title} />
            </div>
            <Coupon />
            <section className=' lg:mt-[700px]'>
                <ExpertFile2 bgImage='' textColor='#1C2539' siteData={siteData}/>
            </section> 

        </div>
    );
};

export default Civilian;