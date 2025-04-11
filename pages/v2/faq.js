import React, { useEffect, useState } from 'react';
import Banner from '../../components/version2/common/banner';
import HomeLayout from '../../layout/home';
import Brands from '../../components/version2/home/brands';
import Contact from '../../components/version2/home/contact';
import { useRouter } from 'next/router';
import { getAllFaqAPI } from '../../helpers/backend_helper';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const Faq = () => {
    const [open, setOpen] = useState(0);
    const [faqData, setFAQData] = useState([]);
    const router = useRouter();

    // fag data rendering
    useEffect(() => {
        getAllFaqAPI().then((data) => {
            setFAQData(data?.data?.docs);
        });
    }, []);

    return (
        <>
            <Banner name="FAQ" title="Home" sub_title="FAQ" />
            <div className="container2 py-10">
                <h1 className='text-center header_1 text-black mt-60 lg:mt-0'>Frequently Ask Question </h1>
                <div className="py-4">
                    <div className="flex mt-5 flex-col lg:flex-col">
                        {
                            faqData.map((item, index) => {
                                return (
                                    <div key={item._id}>
                                        <div className='flex items-center rounded-xl border border-white shadow-lg mt-4' onClick={() => setOpen(index)}> 
                                            {/* when show answer the border color will be  */}

                                            <div className="pl-4 w-full cursor-pointer" >
                                                <div className="flex justify-between">
                                                    <p className='mt-6 text-dark_gray header_5 h-auto'>{item.question}</p>
                                                    <div className="flex items-center justify-center px-2">
                                                        <div className="">
                                                            {open === index ?
                                                                <FiChevronUp size={22} /> :

                                                                <FiChevronDown size={22} />}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='text-start'>
                                                    {open === index && <p className="text-bodytext paragraph mt-2 lg:h-32 mb-8">{item.answer}.</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div> 
            <Contact />
            <Brands />
        </>
    );
};

Faq.layout = HomeLayout
export default Faq;