import { useEffect, useState } from "react";
import { getSiteSettingInformationAPI, getSiteHomeAPI } from "../../helpers/backend_helper";
import Header from "../../components/version3/common/Header";
import Navbar from "../../components/version3/common/Navbar";
import Footer from "../../components/version3/common/Footer";
import ContactPageVersion1 from "../../components/version3/innerpage1/ContactPage";
import ContactPageVersion2 from "../../components/version3/innerpage2/ContactPage";
import ContactPageVersion3 from "../../components/version3/innerpage3/ContactPage";
import SectionHeader from "../../components/version3/innerpage3/common/SectionHeader";

const ContactPage = () => {
    const [siteData, setSiteData] = useState({});
    const [theme, setTheme] = useState(null);
    const [number, setNumber] = useState(null);
    const [isLoading, setLoading] = useState(true);

    // Fetch site data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const siteInfo = await getSiteSettingInformationAPI();
                const data = await getSiteHomeAPI();

                setSiteData(data?.data || {});
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
        <div className={theme === "three" ? "bg-[#101928]" : ""}>
            <Header />
            <Navbar radius={theme === "two" ? "100px" : undefined} />

            {/* Render theme-specific content */}
            {theme === "one" && number === "v3" && (
                <>
                    <ContactPageVersion1 siteData={siteData} />
                    <Footer bgColor="#101928" />
                </>
            )}

            {theme === "two" && number === "v3" && (
                <>
                    <SectionHeader
                        heading="Contact"
                        title="Contact"
                        heading2="Home"
                        bgImage="/v3/InnerPage/About/bg2.svg"
                    />
                    <ContactPageVersion2 siteData={siteData} />
                    <Footer bgColor="#15362C" />
                </>
            )}

            {theme === "three" && number === "v3" && (
                <>
                    <ContactPageVersion3 siteData={siteData} />
                    <Footer bgColor="#15362C" />
                </>
            )}
        </div>
    );
};

export default ContactPage;
