import React, { useEffect, useState } from 'react';
import HomeLayout from '../../layout/home';
import Banner from '../../components/version2/common/banner';
import { HiOutlineLocationMarker, HiPhone } from "react-icons/hi";
import { MdMarkEmailRead } from "react-icons/md";
import Brands from '../../components/version2/home/brands';
import { getOneSiteSettingAPI } from '../../helpers/backend_helper';
import { FaFax } from "react-icons/fa";
import HomePageContactForm from "../../components/frontend/form/contactForm/homeForm ";


const Contact = () => {
    const [contactContent, setContactContent] = useState({});
    useEffect(() => {
        getOneSiteSettingAPI().then((data) => {

            if (data?.status === true) {
                setContactContent(data?.data);
            }
        })
    }, [])

    const addressData = [
        {
            id: 0,
            tittle: 'Address:',
            data: ` ${contactContent?.office_address ?? ""}`,
            icon: <HiOutlineLocationMarker className="w-16 h-16 text-hover" />,
        },
        {
            id: 1,
            tittle: 'Tel:',
            data: ` ${contactContent?.contact_number ?? ""}`,
            icon: <HiPhone className="w-16 h-16 text-hover" />,
        },
        {
            id: 2,
            tittle: 'Email:',
            data: `${contactContent?.contact_email ?? ""}`,
            icon: <MdMarkEmailRead className="w-16 h-16 text-hover" />,
        },
        {
            id: 3,
            tittle: 'Fax:',
            data: ` ${contactContent?.fax ?? ""}`,
            icon: <FaFax className="w-16 h-16 text-hover" />,
        },
    ]
    const fromStyle = [{
        bgcolor: 'white',
        textColor: 'black',
    }]
    return (
        <>
            <Banner name="Contact Us" title="Home" sub_title="Contact Us" />
            <div className="container2 py-16">
                <div className="flex lg:flex-row flex-col gap-x-[16px] gap-y-[12px] mt-16">
                    <div className='w-full lg:w-[600px] lg:pl-10 h-[900px] lg:h-[800px] relative items-start'>
                        <div
                            className='lg:absolute z-20 bg-[#292828] hero_font_family flex h-full rounded-3xl mt-8 lg:mt-0'>
                            <div className='rounded-lg m-[4%]'>
                                <p className='header_6 text-hover'>Contact Us</p>
                                <p className='header_2 text-white'>Send Us a Message</p>
                                <p className='paragraph text-[#fff]'>Please do not hesitate to send us a message, We are
                                    looking forward to hearing from you! We reply within 24 hours.</p>

                                <div className='flex flex-col rounded-full'>
                                    {/* form component rendering */}
                                    <div className=''>
                                        {
                                            fromStyle?.map((d, i) => <HomePageContactForm key={i + 1} color={d ?? ""} />)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex mt-20 lg:mt-0">
                        <div className="lg:gap-x-16 lg:pl-28 lg:mt-0">
                            <div className="flex items-center">
                                <span className="flex justify-center">
                                    <img src="/v2/support.png" alt="logo" />
                                </span>
                                <div className="pl-4">
                                    <p className="mt-2 text-[#292B49] header_4">
                                        Contact US
                                        <br />
                                        24 /7
                                    </p>
                                </div>
                            </div>

                            {
                                addressData?.map((val) => {
                                    return (
                                        <div className="flex items-center mt-10" key={val?.id}>
                                            <span className="flex justify-center bg-gray_4 rounded-full ">
                                                {val?.icon}
                                            </span>
                                            <div className="pl-4">
                                                <p className="mt-2 text-[#292B49] text-[16px] font-semibold">{val?.tittle} </p>
                                                <p className="paragraph_2 text-[16px] text-secondary_gray pt-2">
                                                    {val?.data}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })
                            }

                        </div>
                    </div>
                </div>

                <Brands />
            </div>
        </>
    );
};

Contact.layout = HomeLayout;
export default Contact;