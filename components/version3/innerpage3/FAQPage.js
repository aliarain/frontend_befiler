import React from 'react';
import FAQ from '../home/FAQ';
import SectionHeader from './common/SectionHeader';

const FAQPage = () => {
    return (
        <div>
            <SectionHeader heading="FAQ'S" title="FAQ'S" heading2='Home' />
             <FAQ/>
        </div>
    );
};

export default FAQPage;