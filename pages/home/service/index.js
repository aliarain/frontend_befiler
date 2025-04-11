import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react'; import ServiceFileExport from '../../../components/frontend/landingPage/fileexport';
import SecondHeader from '../../../components/frontend/landingPage/header/secondHeader';
import MilitaryServicePage from '../../../components/frontend/landingPage/situationsPages/military';
import StudentServicePage from '../../../components/frontend/landingPage/situationsPages/StudentServicePage';
import Footer from '../../../components/frontend/shared/footer';
import { getAllTaxSituationAPI, getNewUserRoleManageAPI, getSiteHomeAPI } from '../../../helpers/backend_helper';
;

const ServicePage = () => {
    const [siteData, setSiteData] = useState({});
    const router = useRouter();
    const [servicePageData, setServicePageData] = useState();
    const [situationPageData, setSituationPageData] = useState();
    const { query } = router;

    // new user role managing data
    useEffect(() => {
        getNewUserRoleManageAPI(query).then((data) => {
            setServicePageData(data?.data);
        });
    }, [query, query.id]);

    // main site service blog data
    useEffect(() => {
        getSiteHomeAPI().then((data) => {
            setSiteData(data?.data);
        })
    }, [])

    // main site service blog data
    useEffect(() => {
        getAllTaxSituationAPI().then((data) => {
            setSituationPageData(data?.data);
        })
    }, [])

    const taxSituationData = situationPageData?.find(tax => tax?.user_role === servicePageData?._id);


    return (
        <div>
            {/* sub landing page hero section */}
            <SecondHeader singleRole={servicePageData} siteData={siteData} situationPage={taxSituationData} />

            {/* role related data section */}
            <StudentServicePage situationPage={taxSituationData}/>

            {/* working process slider */}
            <MilitaryServicePage singleRole={servicePageData}  situationPage={taxSituationData}/>

            {/* file on expert section */}
            <ServiceFileExport siteData={siteData} />

            <Footer />
        </div>
    );
};

export default ServicePage;