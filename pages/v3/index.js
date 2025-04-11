import { useEffect, useState } from "react";
import { getSiteSettingInformationAPI, getSiteHomeAPI } from "../../helpers/backend_helper";
// theme 1
import Hero from "../../components/version3/home/Hero";
import Experience from "../../components/version3/home/Experience";
import Expert from "../../components/version3/home/Expert";
import WhyTaxStick from "../../components/version3/home/WhyTaxStick";
import FAQ from "../../components/version3/home/FAQ";
import TaxFile from "../../components/version3/home/TaxFile";
import Service from "../../components/version3/home/Service";
import Testimonial from "../../components/version3/home/Testimonial";
import ExpertTeam from "../../components/version3/home/ExpertTeam";
// theme2
import Hero2 from "../../components/version3/home2/Hero";
import SupportService from "../../components/version3/home2/SupportService";
import AboutCompany from "../../components/version3/home2/AboutCompany";
import Testimonials2 from "../../components/version3/home2/Testimonial2";
import Service2 from "../../components/version3/home2/Service2";
import ExpertFile2 from "../../components/version3/home2/ExpertFile2";
import ExpertTeam2 from "../../components/version3/home2/ExpertTeam2";
import Contact from "../../components/version3/home2/Contact";
//  theme 3
import Hero3 from "../../components/version3/home3/Hero3";
import Trusted3 from "../../components/version3/home3/Trusted";
import About3 from "../../components/version3/home3/About3";
import TaxPlan from "../../components/version3/home3/TaxPlan";
import ExpertFile3 from "../../components/version3/home3/ExpertFile3";
import TaxFile3 from "../../components/version3/home3/TaxFile3";
import Testimonial3 from "../../components/version3/home3/Testimonial3";
import ExpertTeam3 from "../../components/version3/home3/ExpertTeam3";

const Version3Home = () => {
    const [siteInformationData, setSiteInformation] = useState(null);
    const [siteData, setSiteData] = useState(null);
    const [LayoutComponent, setLayoutComponent] = useState(null);

    // Fetch both site information and site data together
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const siteInfoData = await getSiteSettingInformationAPI();
                const homeData = await getSiteHomeAPI();

                setSiteInformation(siteInfoData?.data || {});
                setSiteData(homeData?.data || []);

                // Call selectLayout only when both pieces of data are available
                if (siteInfoData?.data && homeData?.data) {
                    selectLayout(siteInfoData?.data, homeData?.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchAllData();
    }, []);

    // Conditional layout selection based on theme
    const selectLayout = (siteInfo, siteData) => {
        const theme = siteInfo?.update_version?.theme;

        if (theme === "one") {
            setLayoutComponent(() => (
                <>
                    <Hero siteData={siteData} />
                    <Experience siteData={siteData} />
                    <Expert siteData={siteData} />
                    <WhyTaxStick bgImage1="/v3/Why/bg.svg" siteData={siteData} />
                    <ExpertTeam siteData={siteData} />
                    <FAQ />
                    <Service siteData={siteData} />
                    <TaxFile siteData={siteData} />
                    <Testimonial siteData={siteData} />
                </>
            ));
        } else if (theme === "two") {
            setLayoutComponent(() => (
                <>
                    <Hero2 siteData={siteData}/>
                    <SupportService  siteData={siteData}/>
                    <AboutCompany siteData={siteData} />
                    <ExpertFile2 siteData={siteData}/>
                    <Service2 siteData={siteData} />
                    <Contact />
                    <ExpertTeam2 siteData={siteData} />
                    <WhyTaxStick siteData={siteData} showDiv={true} bgImage2="/v3/why2/footerBg.svg" />
                    <Testimonials2 siteData={siteData}/>
                </>
            ));
        } else if (theme === "three") {
            setLayoutComponent(() => (
                <>
                    <Hero3 siteData={siteData}/>
                    <Trusted3 siteData={siteData}/>
                    <About3 siteData={siteData}/>
                    <TaxPlan siteData={siteData}/>
                    <ExpertFile3 siteData={siteData}/>
                    <TaxFile3 siteData={siteData}/>
                    <Testimonial3 siteData={siteData}/>
                    <Contact bgColor="bg-[#012A2B]" textColor="text-white" inputBg="bg-[#012A2B]" />
                    <ExpertTeam3 siteData={siteData}/>
                </>
            ));
        }
    };

    return (
        <div>
            {LayoutComponent ? LayoutComponent : (
                <div className="p-4 space-y-4 animate-pulse">
                    <div className="h-8 bg-gray-300 rounded-md"></div>
                    <div className="h-6 bg-gray-300 rounded-md w-3/4"></div>
                    <div className="h-48 bg-gray-300 rounded-md"></div>
                    <div className="h-48 bg-gray-300 rounded-md"></div>
                    <div className="h-48 bg-gray-300 rounded-md"></div>
                    <div className="h-8 bg-gray-300 rounded-md w-1/2 mt-8"></div>
                </div>
            )}
        </div>
    );
};

export default Version3Home;
