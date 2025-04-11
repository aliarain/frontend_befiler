import { useEffect, useState } from "react";
import { getSiteSettingInformationAPI, getAllFrontPageAPI } from "../../helpers/backend_helper";
import Header from "../../components/version3/common/Header";
import Navbar from "../../components/version3/common/Navbar";
import Footer from "../../components/version3/common/Footer";
import SectionHeader from "../../components/version3/innerpage1/common/SectionHeader";
import SectionHeader1 from "../../components/version3/innerpage3/common/SectionHeader";
import MenuPage from './menu_page';
import { useRouter } from 'next/router';

const FrontEnd = () => {
    const [theme, setTheme] = useState(null);
    const [number, setNumber] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const { query, push } = useRouter()
    const [frontPageData, setFrontPageData] = useState();

    useEffect(() => {
        getAllFrontPageAPI().then(data => {
            setFrontPageData(data?.data?.docs);
        })
    }, [])

    const pageData = frontPageData?.find(doc => doc?._id === query?._id);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const siteInfo = await getSiteSettingInformationAPI();
                setTheme(siteInfo?.data?.update_version?.theme);
                setNumber(siteInfo?.data?.update_version?.number);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="p-4 space-y-4 animate-pulse">
                {/* Shimmer effect for header */}
                <div className="h-8 bg-gray-300 rounded-md"></div>
                <div className="h-6 bg-gray-300 rounded-md w-3/4"></div>
                <div className="h-48 bg-gray-300 rounded-md"></div>
                <div className="h-48 bg-gray-300 rounded-md"></div>
                <div className="h-48 bg-gray-300 rounded-md"></div>
                <div className="h-8 bg-gray-300 rounded-md w-1/2 mt-8"></div>
            </div>
        );
    }

    return (
        // <div className={theme === "three" ? "bg-[#101928]" : ""}>
        <div>
            <Header />
            <Navbar radius={theme === "two" && number === "v3" ? "100px" : ""} />

            {/* Render theme-specific content */}
            {theme === "one" && number === "v3" && (
                <>
                    <SectionHeader
                        heading={pageData?.name ?? ""}
                        title={pageData?.name ?? ""}
                        heading2="Home"

                    />
                    <MenuPage pageData={pageData} />
                    <Footer bgColor="#101928" />
                </>
            )}

            {theme === "two" && number === "v3" && (
                <>
                    <SectionHeader1
                        heading={pageData?.name ?? ""}
                        title={pageData?.name ?? ""}
                        heading2="Home"
                        bgImage="/v3/InnerPage/About/bg2.svg"

                    />
                    <MenuPage pageData={pageData} />
                    <Footer bgColor="#15362C" />
                </>
            )}

            {theme === "three" && number === "v3" && (
                <>
                <SectionHeader1 heading='Terms and Condition' title='Terms and Condition' heading2='Home' />
                    <MenuPage pageData={pageData} bg='#fff' textColorH1= '' textColorD="#C6CED1"  />
                    <Footer bgColor="#15362C" />
                </>
            )}
        </div>
    );
};
export default FrontEnd;
