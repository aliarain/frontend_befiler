import React from 'react';
import HomeLayout from '../../layout/home';
import Banner from '../../components/version2/common/banner';

const TermsCondition = ({pageData}) => {
    return (
        <>
            <Banner name={pageData?.name ?? ""} title="Home" sub_title={pageData?.name ?? ""}/>
            <div className="container2 pb-10">
                <h1 className='text-[#292828] header_1 lg:mt-0'>{pageData?.name ?? ""}</h1>
                <p className='paragraph text-[#696161] mt-4'
                   dangerouslySetInnerHTML={{__html: pageData?.contents ?? ""}}>
                </p>
            </div>
        </>
    );
};

TermsCondition.layout = HomeLayout
export default TermsCondition;