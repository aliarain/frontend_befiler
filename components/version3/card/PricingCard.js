import React, { useState } from 'react';
const PricingCard = ({ plan, IconImage, bg, divBg = '#ffff', hoverBg, text, itemText = 'black', iconText = '#fff', buttonText = '#fff', radius = '4px', borderBg = 'gray-100', hoverButton = '#10B981', button = '#10B981', itemHover = '#fff', bText = '#fff' }) => {
    const [isHovered, setIsHovered] = useState(false); 

    return (
        <div
            className={`rounded-[20px] relative py-8 lg:py-9 xl:py-10  h-[502px] transition-all border-2  duration-300 ease-in-out ${isHovered ? 'border-[#10B981]' : 'border-transparent'}`}
            style={{
                boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.10)',
                backgroundColor: isHovered ? hoverBg : divBg,
                color: text,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`mx-auto w-[100px] h-[100px] rounded-full flex justify-center items-center transition-all duration-300 ease-in-out`}
                style={{
                    backgroundColor: isHovered ? bg : hoverBg,
                }}
            >
                <IconImage className="text-5xl" style={{ color: isHovered ? hoverBg : iconText }} />
            </div>
            <h3
                className={`text-[28px] capitalize font-semibold text-center mt-8 lg:mt-9 xl:mt-10 transition-all duration-300 ease-in-out`}
                style={{ color: isHovered ? bg : text }}
            >
                {`Tax fees if ${plan?.user_role?.split('_').join(' ')}`}
            </h3>
           
            <div className="mt-6 flex flex-col items-center">
            
                <ul className="list-disc list-inside -ml-4 mt-[16px] ">

                    <li
                    
                        className={`flex items-center text-[18px] mb-2 relative transition-all duration-300 ease-in-out`}
                        style={{
                            color: isHovered ? itemHover : itemText,
                        }}
                    >
                        <span
                            className={`w-2 h-2 rounded-full mr-3`}
                            style={{ backgroundColor: isHovered ? itemHover : itemText }}
                        />
                        Tax Fees: {plan?.taxfees}
                        </li>
                        <li
                    
                    className={`flex items-center text-[18px] mb-2 relative transition-all duration-300 ease-in-out`}
                    style={{
                        color: isHovered ? itemHover : itemText,
                    }}
                >
                    <span
                        className={`w-2 h-2 rounded-full mr-3`}
                        style={{ backgroundColor: isHovered ? itemHover : itemText }}
                    />
                    Service Charges: {plan?.service_charges}</li>
                    
                    <li
                    
                        className={`flex items-center text-[18px] mb-2 relative transition-all duration-300 ease-in-out`}
                        style={{
                            color: isHovered ? itemHover : itemText,
                        }}
                    >
                        <span
                            className={`w-2 h-2 rounded-full mr-3`}
                            style={{ backgroundColor: isHovered ? itemHover : itemText }}
                        />
                        Welcome Benefit: {plan?.welcome_benefit}</li>
                    {
                        plan?.additional_fees?.map((plan) => {
                            return <li key={plan?._id} className={`flex items-center text-[18px] mb-2 relative transition-all duration-300 ease-in-out`}
                            style={{
                                color: isHovered ? itemHover : itemText,
                            }}
                        >
                            <span
                                className={`w-2 h-2 rounded-full mr-3`}
                                style={{ backgroundColor: isHovered ? itemHover : itemText }}
                            />
                            {plan?.additional_fee_name}</li>
                        })
                    }
                </ul>
            </div>
    
            
            
        </div>
    );
};

export default PricingCard;
