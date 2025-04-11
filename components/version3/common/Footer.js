/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import { getAllFrontPageAPI, getOneSiteSettingAPI, getSiteSettingInformationAPI, postMarketingSubscribers } from "../../../helpers/backend_helper";
import { useEffect, useState } from "react";
import { useI18n } from "../../../contexts/i18n";
import { Form } from "antd";
import FormInput from "../../form/input";
import { userAction } from "../../../helpers/new_hooks";

export default function Footer({ bgColor }) {
  const i18n = useI18n()
  const [form] = Form.useForm();

  const [frontPage, setFrontPage] = useState([]);
  const [siteData, setSiteData] = useState();
  const router = useRouter();

  const [getSiteSettingData, setSiteSettingData] = useState({});
  useEffect(() => {
    getSiteSettingInformationAPI().then(res => {
      if (res?.status === true) {
        setSiteSettingData(res?.data)

      }
    })
  }, [])

  //show all front page data
  useEffect(() => {
    getAllFrontPageAPI().then(data => {
      setFrontPage(data?.data?.docs);
    })
  }, [])

  //get one  site data
  useEffect(() => {
    getOneSiteSettingAPI().then((data) => {
      setSiteData(data?.data);
    })
  }, [])

  // filter menu pages
  const footerMenuData = frontPage?.filter(data => data?.type === "footer");

  const handleRouteChange = async (_id) => {
    await router.push(`/v3/front-end?_id=${_id}`)
  }

  const year = new Date().getFullYear();
  return (
    <div style={{ backgroundColor: bgColor }} className=" h-[1650px]  md:h-[925px] lg:h-[1100px] xl:h-[1000px] relative mt-16" >
      <div className="relative footerV3">
        <div className="max-w-[1320px] mx-auto ">
          <div className="hidden md:flex mx-auto   md:h-[750px] lg:h-[870px] max-w-[1190px]">
            <div className="flex-1 border-l border-b border-[#25443B]"></div>
            <div className="flex-1 border-l border-b border-[#25443B]"></div>
            <div className="flex-1 border-l border-b border-[#25443B]"></div>
            <div className="flex-1 border-l border-r border-b border-[#25443B]"></div>
          </div>
          <div className=" px-4 lg:px-0 absolute top-0 text-white">
            <div className="text-white relative">
              <h2 className="header text-center">Take Control of Your Software Today</h2>
              <p className="description w-[50%] md:w-[60%] xl:w-[50%]">SaaS services for cloud storage and file sharing allow users store, access, and share files securely from any device with an internet connection.</p>

              <div className="flex justify-center mt-10">
                <Form
                  form={form}
                  onFinish={(values) =>
                    userAction(postMarketingSubscribers, values, () => {
                      form.resetFields();
                    })
                  }
                  className="px-[20px] flex flex-col lg:flex-row gap-x-5 newsletter"
                >
                  <div className="lg:w-[700px] md:w-[600px] w-[250px]">
                    <FormInput
                      layout="vertical"
                      name={"email"}
                      isEmail
                      placeholder="Enter your email"
                      required
                      style={{
                        padding: '21px'
                      }
                      }
                    />
                  </div>

                  <button
                    className=" mt-[12px] mx-auto h-fit lg:mt-0 md:ml-[20px] px-10 py-[18px] button  text-white text-lg lg:text-xl font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                    {"Subscribe"}
                  </button>
                </Form>
              </div>
              <div className="max-w-[1320px]  mt-14 md:mt-24 lg:mt-[140px] ">
                <div className="flex flex-col md:flex-row space-x-0 md:space-x-[50px] lg:space-x-[100px] xl:space-x-[140px]">
                  <div className="w-full md:w-[30%]">
                    <Link href="/">
                      <img src={getSiteSettingData?.logo || ""} alt="logo" width={162} height={35} className="cursor-pointer" />
                    </Link>
                    <p className="description !mt-6 md:!mt-10 !text-left">Software a Service (SaaS) revolutionized landscape
                      of software delivery and consumption. Offering flexible
                      an scalable solution, SaaS platforms provide users with
                      to software applications over the internet. </p>
                    <div className="flex mt-6 md:mt-10 space-x-3 justify-center md:justify-start ">
                      <div className="rounded-full hover:bg-[#10B981] border border-[#25443B] hover:border-[#10B981]"> <a href={`${siteData?.facebook ?? ""}`}><img className="px-[11px] py-2" src="/v3/footer/facebook-f.png" alt="facebook" /></a></div>
                      <div className="rounded-full hover:bg-[#10B981] border border-[#25443B] hover:border-[#10B981]"> <a href={`${siteData?.twitter ?? ""}`}> <img className="p-2" src="/v3/footer/twitter.png" alt="facebook" /></a></div>
                      <div className="rounded-full hover:bg-[#10B981] border border-[#25443B] hover:border-[#10B981]"> <a href={`${siteData?.instagram ?? ""}`}> <img className="p-2" src="/v3/footer/instagram.png" alt="instagram" /></a></div>
                      <div className="rounded-full hover:bg-[#10B981] border border-[#25443B] hover:border-[#10B981]"> <a href={`${siteData?.linkedIn ?? ""}`}><img className="p-2" src="/v3/footer/linkedin-in.png" alt="facebook" /></a></div>
                    </div>
                  </div>
                  <div className="w-full mt-10 md:mt-0 flex flex-col space-y-10 md:space-y-0  md:flex-row justify-between md:w-[70%]">
                    <div className="mx-auto md:mx-0">
                      <p className="links-heading">Quick Links</p>
                      <div className=" flex flex-col mt-3 md:mt-8 lg:mt-10 ">
                        <Link href="/" className="!text-[12px] !md:text-[14px]" >Page Builder</Link>
                        <Link href="/" className="!text-[12px] !md:text-[14px]">Theme Options</Link>
                        <Link href="/" className="!text-[12px] !md:text-[14px]">Theme builder</Link>
                        <Link href="/" className="text-14px]">Template library</Link>
                        <Link href="" className="text-14px]">Design & Branding</Link>
                      </div>
                    </div>
                    <div className="md:mt-0 mx-auto md:mx-0">
                      <p className="links-heading">Support</p>
                      <div className="flex flex-col mt-3 md:mt-8 lg:mt-10 ">
                        <Link href="" className="linkStyle">Documentation</Link>
                        <Link href="" className="linkStyle">Support Center</Link>
                        <Link href="" className="!color-white">Community</Link>
                        <Link href="/v3/faq" className="linkStyle">FAQs & Helps</Link>
                        {
                          footerMenuData?.map((val) => {
                            return (
                              <span onClick={() => handleRouteChange(val?._id)} className='linkStyle' key={val._id}>{val.name}</span>
                            )
                          })
                        }
                      </div>
                    </div>
                    <div className=" md:mt-0 mx-auto md:mx-0">
                      <p className="links-heading">Address</p>
                      <div className="flex flex-col mt-3 md:mt-8 lg:mt-10">
                        <p className="linkStyle md:!max-w-[100px] lg:!max-w-[200px] xl:!max-w-[300px]"> {siteData?.office_address ?? ""}</p>
                        <p className="linkStyle mt-4 md:mt-6 mailto:lg:mt-10">{siteData?.contact_email ?? ""}</p>
                        <p className="linkStyle mt-4">{siteData?.contact_number ?? ""}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Link href=''>
                  <div className="mx-auto hidden xl:flex relative right-6  cursor-pointer rounded-full mt-10 w-[55px] h-[55px] bg-[#10B981] pt-[18px]">
                    <div className=" flex justify-center cursor-pointer relative left-5 ">
                      <img className="-rotate-90 w-4 h-3 mx-auto " src="/v3/footer/right.png" alt="right aero" />
                    </div>

                  </div>
                </Link>
                <div className="flex flex-col md:flex-row items-center justify-center mt-4 md:mt-5 lg:mt-[30px]">
                  <p className="text-[16px] font-normal"> {year} &copy; All rights reserved by Taxstick</p>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="absolute top-10 left-0">
          <img className="md:max-w-[250px] lg:max-w-[300px]" src="/v3/footer/Rectangle 5252.png" />
          <img className="md:max-w-[250px] lg:max-w-[400px] relative -top-36" src="/v3/footer/Rectangle 5253.png" />
        </div>
        <div className="absolute top-10 right-0">
          <img className="md:max-w-[250px] lg:max-w-[300px]" src="/v3/footer/Rectangle 5245.png" />
          <img className="md:max-w-[250px] lg:max-w-[300px] relative -top-36" src="/v3/footer/Rectangle 5245.png" />
        </div>
      </div>
    </div>
  );
}