import React from 'react';
import TaxBeneficiary from './common/TaxBeneficiary';
import ExpertFile3 from '../home3/ExpertFile3';
import Trusted3 from '../home3/Trusted';
import Coupon from '../innerpage2/common/Coupon';
import SectionHeader from './common/SectionHeader';

const Civilian = ({ siteData, serviceData, taxSituationData }) => {
    return (
        <div>
            <SectionHeader heading='Tax Beneficiary' title={serviceData?.display_name} heading2='Home' bgImage="/v3/InnerPage/About/bg2.svg" />
            <div className=' max-w-[1320px] mx-auto mt-20 mb-32'>
                <h1 className='text-[48px] pb-20 font-semibold text-[#fff]'>Hello {serviceData?.display_name} </h1>
            </div>
            <div className=' -mt-40 '>
            <TaxBeneficiary image1={taxSituationData?.hero_section_image} image2={taxSituationData?.section_2_image} title1={taxSituationData?.hero_section_title} paragraph={taxSituationData?.hero_section_title_Sub_title} title={serviceData?.display_name}/> 
             </div>
            <div className='-mt-10' >
                <TaxBeneficiary image1={taxSituationData?.section_2_image} image2={taxSituationData?.section_3_image} title1={taxSituationData?.section_2_title} paragraph={taxSituationData?.section_2_sub_title} position="md:flex-row-reverse" title={serviceData?.display_name}  />
            </div>
            <div className=' pb-24' >
                <TaxBeneficiary image1={taxSituationData?.section_3_image} image2={taxSituationData?.hero_section_image} title1={taxSituationData?.section_3_title} paragraph={taxSituationData?.section_3_sub_title} title={serviceData?.display_name} />
            </div>

            {/* Trusted Part  */}
            <div className='mx-auto -ml-6 sm:ml-0 px-8 lg:px-0 -mt-28 2xl:-mt-10'>
                <Trusted3 siteData={siteData} />
            </div>

            {/* coupon */}
            <div className='max-w-[1320px] mx-auto 2xl:-mt-20'>
                <Coupon
                    bgImage='/v3/coupon/image.svg'  bgColor='#012A2B99'  // Correct hex format
                />
            </div>

            {/* Expert  */}
            <div className='mt-28 !mb-28'>
                <ExpertFile3 siteData={siteData} />
            </div>

        </div>
    );
};

export default Civilian;