import { useEffect, useState } from "react";
import { getOneAboutContentAPI, getSiteHomeAPI, getSiteSettingInformationAPI } from "../../helpers/backend_helper";
import Header from "../../components/version3/common/Header";
import Navbar from "../../components/version3/common/Navbar";
import Footer from "../../components/version3/common/Footer";
import AboutVersion1 from "../../components/version3/innerpage1/About";
import AboutVersion2 from "../../components/version3/innerpage2/About";
import AboutVersion3 from "../../components/version3/innerpage3/About";
import SectionHeader from "../../components/version3/innerpage3/common/SectionHeader";

const AboutPage = () => {
    const [siteData, setSiteData] = useState(null);
    const [aboutContent, setAboutContent] = useState({});
    const [theme, setTheme] = useState(null);
    const [number, setNumber] = useState(null);
    const [isLoading, setLoading] = useState(true);
    // Fetch site data
    useEffect(() => {
        const fetchData = async () => {
            const siteInfo = await getSiteSettingInformationAPI();
            const homeData = await getSiteHomeAPI();
            const aboutRes = await getOneAboutContentAPI();

            setSiteData(homeData?.data || []);
            if (aboutRes?.status) {
                setAboutContent(aboutRes?.data);
            }
            setTheme(siteInfo?.data?.update_version?.theme);
            setNumber(siteInfo?.data?.update_version?.number);
            setLoading(false);
        };
        
        fetchData();
    }, []);
    // Conditional rendering of theme-based components
    if (isLoading) {
        return (
            <div className="p-4 space-y-4 animate-pulse">
                {/* Shimmer effect for header */}
                <div className="h-8 bg-gray-300 rounded-md"></div>
                
                {/* Shimmer effect for navbar */}
                <div className="h-6 bg-gray-300 rounded-md w-3/4"></div>
    
                {/* Shimmer effect for content */}
                <div className="h-48 bg-gray-300 rounded-md"></div>
                <div className="h-48 bg-gray-300 rounded-md"></div>
                <div className="h-48 bg-gray-300 rounded-md"></div>
                
                {/* Shimmer effect for footer */}
                <div className="h-8 bg-gray-300 rounded-md w-1/2 mt-8"></div>
            </div>
        );
    }

    return (
        <div className={theme === "three" ? "bg-[#101928]" : ""}>
            <Header />
            <Navbar radius={theme === "two" ? "100px" : undefined} />
            
            {/* Render theme-specific content */}
            {theme === "one" && number === "v3" && (
                <>
                    <AboutVersion1 siteData={siteData} aboutContent={aboutContent} />
                    <Footer bgColor="#101928" />
                </>
            )}

            {theme === "two" && number === "v3" && (
                <>
                    <SectionHeader heading="About" title="About" heading2="Home" bgImage="/v3/InnerPage/About/bg2.svg" />
                    <AboutVersion2 siteData={siteData} aboutContent={aboutContent} />
                    <Footer bgColor="#15362C" />
                </>
            )}

            {theme === "three" && number === "v3" && (
                <>
                    <AboutVersion3 siteData={siteData} aboutContent={aboutContent} />
                    <Footer bgColor="#15362C" />
                </>
            )}
        </div>
    );
};

export default AboutPage;





