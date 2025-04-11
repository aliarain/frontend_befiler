import React, {useEffect, useState} from 'react'
import HomeLayout from '../../layout/home';
import {getAllFrontPageAPI} from '../../helpers/backend_helper';
import TermsCondition from './terms_condition';
import {useRouter} from 'next/router';

const FrontEnd = () => {
    const {query, push} = useRouter()
    const [frontPageData, setFrontPageData] = useState();

    useEffect(() => {
        getAllFrontPageAPI().then(data => {
            setFrontPageData(data?.data?.docs);
        })
    }, [])

    const pageData = frontPageData?.find(doc => doc?._id === query?._id);

    return (
        <>
            <TermsCondition pageData={pageData}/>
        </>
    );
};
FrontEnd.layout = HomeLayout;
export default FrontEnd;
