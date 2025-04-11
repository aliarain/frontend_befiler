import { useEffect, useState } from "react";
import { getSiteSettingInformationAPI, getSiteHomeAPI } from "../../helpers/backend_helper";
import Header from "../../components/version3/common/Header";
import Navbar from "../../components/version3/common/Navbar";
import Footer from "../../components/version3/common/Footer";
import CivilianVersion1 from "../../components/version3/innerpage1/Civilian";
import CivilianVersion2 from "../../components/version3/innerpage2/common/Civilian";
import CivilianVersion3 from "../../components/version3/innerpage3/Civilian";

const CivilianPage = ({ taxSituationData, serviceData}) => {
    const [siteData, setSiteData] = useState({});
    const [theme, setTheme] = useState(null);
    const [number, setNumber] = useState(null);
    const [isLoading, setLoading] = useState(true);

    // Fetch site data and theme information
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
            <Navbar radius={theme === "two" ? "100px" : undefined}  />
            
            {/* Render theme-specific content */}
            {theme === "one" && number === "v3" && (
                <>
                    <CivilianVersion1 siteData={siteData} taxSituationData ={taxSituationData} serviceData ={serviceData} />
                    <Footer bgColor="#101928" />
                </>
            )}

            {theme === "two" && number === "v3" && (
                <>
                    <CivilianVersion2 siteData={siteData} taxSituationData ={taxSituationData} serviceData ={serviceData}/>
                    <div className="lg:-mt-[850px]">
                        <Footer bgColor="#15362C" />
                    </div>
                </>
            )}

            {theme === "three" && number === "v3" && (
                <>
                    <CivilianVersion3 siteData={siteData} taxSituationData ={taxSituationData} serviceData ={serviceData} />
                    <Footer bgColor="#15362C" />
                </>
            )}
        </div>
    );
};

export default CivilianPage;
