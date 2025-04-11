import HomeLayout from "../../layout/home";
import Hero from "../../components/version2/home/hero";
import Members from "../../components/version2/home/members";
import Brands from "../../components/version2/home/brands";
import Testimonials from "../../components/version2/home/testimonials";
import TaxFiling from "../../components/version2/home/taxFiling";
import Contact from "../../components/version2/home/contact";
import WhyUs from "../../components/version2/home/whyus";
import WhyTaxstick from "../../components/version2/home/whytaxstick";
import Service from "../../components/version2/home/service";
import AboutHome from "../../components/version2/home/about_home";
import { useEffect, useState } from "react";
import { getOneAboutContentAPI, getSiteHomeAPI} from "../../helpers/backend_helper";
import NewsLetter from "../../components/home/newsLetter";


const Version2Home = () => {
    const [isLoading, setLoading] = useState(false)
    const [siteData, setSiteData] = useState({});
    const [aboutContent, setAboutContent] = useState({});


    useEffect(() => {
        getSiteHomeAPI().then((data) => {
            setSiteData(data?.data);
        })
    }, [])

    useEffect(() => {
        setLoading(true)
        getOneAboutContentAPI().then(res => {
            if (res?.status === true) {
                setAboutContent(res?.data)
                setLoading(false)
            }
        })
    }, [])

    return (
        <>
            <Hero siteData={siteData}/>
            <WhyUs siteData={siteData} />
            <WhyTaxstick siteData={siteData} aboutContent={aboutContent} />
            <AboutHome aboutContent={aboutContent} />
            <Members aboutContent={aboutContent} />
            <Service siteData={siteData} /> 
            <TaxFiling siteData={siteData} />
            <Testimonials siteData={siteData} />
            <Contact />
            <NewsLetter/>
            <Brands />
        </>
    )
}

Version2Home.layout = HomeLayout
export default Version2Home
