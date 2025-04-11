import React from 'react';
import HomeLayout from '../../layout/home';

const MenuPage = ({pageData ,textColorH1='#292828', textColorD= '#696161', bg}) => {
    return (
        <>
            <div className="container2 !py-12 lg:py-10">
                <h1 className={`text-[${textColorH1}] !text-5xl md:text-7xl md:header_1 lg:mt-0`}>{pageData?.name ?? ""}</h1>
                
                <p className={`paragraph  text-[${textColorD}] mt-4`}
                   dangerouslySetInnerHTML={{__html: pageData?.contents ?? ""}}>
                </p>
                
            </div>
        </>
    );
};

MenuPage.layout = HomeLayout
export default MenuPage;

