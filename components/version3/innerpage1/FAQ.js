import React, { useEffect, useState } from 'react';
import { Collapse } from 'antd';
import { getAllFaqAPI } from '../../../helpers/backend_helper';

const FAQ = () => {
    const [activeKey, setActiveKey] = useState('1');
    const [faqData, setFAQData] = useState([]);

    useEffect(() => {
        getAllFaqAPI().then((data) => {
            setFAQData(data?.data?.docs);
        });
    }, []);

    return (

            <div className="max-w-[1320px] mx-auto w-full pt-28 pb-10 px-6 lg:px-0">
                <h1 className='text-[48px] font-bold text-[#1C2539]'>Frequently Asked Questions</h1> 

                {/* Collapse section */}
                <div className="w-full max-w-[1320px] mt-12 pageFaq">
                    <Collapse
                        accordion
                        activeKey={activeKey}
                        onChange={setActiveKey}
                        expandIconPosition="start"
                        expandIcon={({ isActive }) => (
                            <span
                                style={{
                                    fontSize: '30px',
                                    color: isActive ? 'text-[#1C2539]' : 'text-[#1C2539]',
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
                                            className={`${activeKey === item.key ? 'text-[#1C2539]' : 'text-[#1C2539]'} text-xl font-semibold flex items-center mt-2`}
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
  
    );
};

export default FAQ;
