import React from 'react';
import TaxBeneficiary1 from './common/TaxBeneficiary1';
import Expert from '../home/Expert';
import Coupon from './common/Coupon';
import SectionHeader from './common/SectionHeader';

const Civilian = ({siteData, serviceData, taxSituationData}) => {
    return (
        <div>
            <SectionHeader heading='Tax Beneficiary' title= {serviceData?.display_name} heading2='Home' />
            <div className=' max-w-[1320px] mx-auto mt-20 mb-20'>
                <h1 className='text-2xl md:text-3xl lg:text-[48px] mx-10 xl:mx-0 font-semibold text-[#1C2539]'>Hello {serviceData?.display_name} </h1>
                </div>
                <div className='experience2 lg:-mt-56 '>
                <TaxBeneficiary1  image={taxSituationData?.hero_section_image} title={taxSituationData?.hero_section_title} paragraph={taxSituationData?.hero_section_title_Sub_title} /></div>
                <div className='experience' >
                    <TaxBeneficiary1 image={taxSituationData?.section_2_image} title={taxSituationData?.section_2_title} paragraph={taxSituationData?.section_2_sub_title} position="md:flex-row-reverse"/>
                </div>
                <div className='experience' >
                    <TaxBeneficiary1 image={taxSituationData?.section_3_image} title={taxSituationData?.section_3_title} paragraph={taxSituationData?.section_3_sub_title}  />
                </div>
                <div className='max-w-[1320px] mx-auto'>
                    <Coupon/>
                    </div>
                <div>
                    <Expert siteData= {siteData}/>
                </div>

        </div>
    );
};

export default Civilian;