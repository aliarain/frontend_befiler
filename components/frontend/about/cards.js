import React from 'react';
import AboutCard from '../card/aboutCard';


const Cards = ({ aboutContent }) => {
    const executiveTeamMember = aboutContent?.executive_team;
    const accountingAffiliatesMember = aboutContent?.accounting_affiliates;


    return (
        <div className='container  hero_font_family'>
            {/* compnay coFounder about */}

            <div className='mt-32'>
                <p className='text-3xl p-2 text-center border-b-2'>Our Executive Team</p>
                <div className='flex justify-center'>
                    <div className='flex justify-center'>
                        {/* executive Team Member rendering section*/}
                        <div className='md:grid md:grid-cols-2 md:gap-[5%] '>
                            {
                                executiveTeamMember?.map((about, index) => <AboutCard key={index + 1} aboutCards={about ?? ""} />)
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* compnay Accounting Affiliates card*/}

            <div className=' my-32 '>
                    <p className='text-3xl text-center p-4 border-b-2'>Our Accounting Affiliates</p>
                <div>
                    <div className='flex justify-center'>
                        {/* accounting Affiliates Member rendering section*/}
                        <div className='md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
                            {
                                accountingAffiliatesMember?.map((about, index) => <AboutCard key={index + 1} aboutCards={about ?? ""} />)
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;