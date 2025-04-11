import React from 'react';
import { GoLocation } from "react-icons/go";
import { ImPhone } from 'react-icons/im';
import { MdEmail, MdPhoneInTalk } from 'react-icons/md';
import ContactForm from '../form/contactForm/contactForm';
import { useState } from 'react';


const Address = ({ contactContent }) => {
    const [sliceData, setSliceData] = useState(null);
    // form custom style
    const fromStyle = [{
        bgcolor: '#E8EAED',
        textColor: 'black',
    }]

    // address data section
    const addressData = [
        { id: 0, tittle: 'Address:', data: ` ${contactContent?.office_address ?? ""}`, icon: GoLocation, },
        { id: 1, tittle: 'Tel:', data: ` ${contactContent?.contact_number ?? ""}`, icon: MdPhoneInTalk, },
        { id: 2, tittle: 'Email:', data: `${contactContent?.contact_email ?? ""}`, icon: MdEmail, },
        { id: 3, tittle: 'Fax:', data: ` ${contactContent?.fax ?? ""}`, icon: ImPhone, },
    ]


    return (
        <div className='p-[5%] hero_font_family container'>
            {/* address */}
            <div className='flex justify-center items-center my-[5%]'>
                <div className='lg:grid grid-cols-2'>
                    {/* contact form */}
                    <div className=''>
                        <p className='text-xl mb-0'>Contact us</p>
                        <p className='text-3xl  mb-3 '>Send Us a Message</p>
                        <p className='text-sm font-normal'>Please do not hesitate to send us a message, We are looking forward to hearing from you! We reply within 24 hours.</p>
                        <div className=''>
                            {
                                fromStyle.map((d, i) => <ContactForm key={i + 1} color={d ?? ""} />)
                            }
                        </div>
                    </div>
                    {/* contact number */}
                    <div className='flex justify-center items-center'>
                        <div className='md:grid md:grid-cols-2  gap-[3%] '>
                            {
                                addressData.map((d, i) => <div key={i + 1} className='h-48 md:my-0 my-2 p-2 rounded shadow  lg:w-[250px] flex justify-center items-center'>
                                    <div>
                                        <span className='flex justify-center'><d.icon className='text-[#14AA40]' size={50} /></span>
                                        <p className='text-[16px] text-center mb-0'>{d?.tittle ?? ""} </p>
                                        <div className={`h-[50px] ${sliceData === d?.id && "scrollbar"}`}>
                                            <p className={`text-[14px] md:text-[16px] mb-0 text-justify `}>
                                                {
                                                    (sliceData === d?.id) ?
                                                        d?.data
                                                        :
                                                        d?.data?.slice(0, 20)
                                                }
                                            </p>
                                            {
                                                (sliceData !== d?.id) && <p className='text-[#14AA40] cursor-pointer text-right' onClick={() => setSliceData(pre => pre = d?.id)}>More...</p>
                                            }
                                        </div>
                                    </div>
                                </div>

                                )
                            }

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Address;