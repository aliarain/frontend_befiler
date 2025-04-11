import { useRouter } from 'next/router';
import React,{useState, useEffect} from 'react';
import { getAllNewUserRoleManageAPI, getAllTaxSituationAPI, getAllUserRoleExceptAdminAPI, getSiteHomeAPI,} from '../../helpers/backend_helper';
import Civilian from './civilian';
import HomeLayout from '../../layout/home';
import Banner from '../../components/version2/common/banner';

const Page = () => {
    const { query, push} = useRouter()
    const [siteData, setSiteData] = useState({});
    const [servicePageData, setServicePageData] = useState();
    const [situationPageData, setSituationPageData] = useState();
    const [userRole, setUserRoles] = useState([]);

    useEffect(() => {
        getAllNewUserRoleManageAPI(query).then((data) => {
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

    useEffect(() => {
        getAllUserRoleExceptAdminAPI().then(res => {
            if (res?.status === true) {
                setUserRoles(res?.data)
            }
        }
        )
    }, [])

    const taxSituationData = situationPageData?.find(tax => tax?.user_role === query?._id);
    const serviceData = userRole?.find(service => service?._id === query?._id);

    return (
        <div>
            <Banner name="Tax's Situation" title="Home" sub_title="Tax's Situtation" />
            <div>
                <Civilian taxSituationData={taxSituationData} serviceData={serviceData} siteData={siteData}/>
            </div>
        </div>
    );
};

Page.layout = HomeLayout;
export default Page;
