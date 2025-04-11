import React from 'react';


const Partnership = ({ siteData }) => {

    return (
        <div className='py-[3%]  bg-[#F6F6FC] '>
            <div className='container  h-auto grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4 partnership'>
                {/* partnership image */}
                {
                    siteData?.partner_ships?.map((pic, index) =>
                        <div key={index + 1} className=' partnership_width bg-white rounded flex justify-center items-center shadow-sm '>
                            <img src={pic ?? "/codecayonImage/partnership1.png"} className="h-10 w-16 md:h-20 md:w-20 partner_logo_objectfit" />
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Partnership;