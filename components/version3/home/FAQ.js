import CommonHeading from '../common/CommonHeading';
import React, { useEffect, useState } from 'react';
import { Collapse } from 'antd';
import { getAllFaqAPI } from '../../../helpers/backend_helper';

const FAQ = () => {
    const [activeKey, setActiveKey] = useState('1');
    const [faqData, setFAQData] = useState([]);

    // fag data rendering
    useEffect(() => {
        getAllFaqAPI().then((data) => {
            setFAQData(data?.data?.docs);
            
        });
    }, []);

    return (
        <div
            className="w-full min-h-screen flex flex-col justify-center items-center  overflow-hidden px-6 lg:px-0"
            style={{
                backgroundImage: 'url("/v3/faq/bg.png")',
                backgroundSize: 'cover',  
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="max-w-[1320px] w-full pt-28 pb-10">
                <CommonHeading heading1="FAQ" heading2="Frequently Asked Questions" textColor="text-white" bgClass='faqHeading' />

                {/* Collapse section */}
                <div className="w-full max-w-[1320px] mt-12 home1Faq">
                    <Collapse
                        accordion
                        activeKey={activeKey}
                        onChange={setActiveKey}
                        expandIconPosition="start"
                        expandIcon={({ isActive }) => (
                            <span
                                style={{
                                    fontSize: '30px',
                                    color: isActive ? 'white' : 'white',
                                    transition: 'transform 0.5s ease',
                                    marginTop: '-2px',
                                }}
                            >
                                {isActive ? '-' : '+'}
                            </span>
                        )}
                        className="!bg-transparent"
                    >
                        {faqData.map((item, index) => (
                            <Collapse.Panel
                                key={item.key}
                                header={
                                    <div className="flex items-center justify-between">
                                        <span
                                            className={`${activeKey === item.key ? 'text-white' : 'text-[#FFFFFF]'} text-xl font-semibold flex items-center mt-2`}
                                        >
                                            {item.question}
                                        </span>
                                    </div>
                                }
                                className='mb-6 !border !border-[#10B981] !rounded-[12px]'
                            >
                                <p className='px-10 text-[16px] '>{item.answer}</p>
                            </Collapse.Panel>
                        ))}
                    </Collapse>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
