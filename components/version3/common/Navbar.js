import { useState, useEffect } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircle } from 'react-icons/io';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getAllFrontPageAPI, getAllUserRoleExceptAdminAPI, getSiteHomeAPI, getSiteSettingInformationAPI, verifyUserAPI } from '../../../helpers/backend_helper';
import { IoPerson } from 'react-icons/io5';

const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/v3/about' },
    {
        name: 'Tax Beneficiary',
        path: '/tax-beneficiary',
        submenu: true, 
    },
    { name: 'Contact', path: '/v3/contact' },
    {
        name: 'Page',
        path: '/page',
        submenu: true, 
    },
];

const Navbar = ({ radius = '4px', bgColor = "#102D33", hoverText = "#10B981" }) => {
    const router = useRouter();
    const [siteData, setSiteData] = useState([]);
    const [getSiteSettingData, setSiteSettingData] = useState(null);
    const [user, setUser] = useState({});
    const [userRole, setUserRoles] = useState([]);
    const [beneficiaryRoles, setBeneficiaryRoles] = useState([]);
    const [activeLink, setActiveLink] = useState(' ');
    const [isOpen, setIsOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState('');
    const [dropdownTimeout, setDropdownTimeout] = useState(null);
    const [loading, setLoading] = useState(true);
    const [frontPage, setFrontPage] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const siteInfoData = await getSiteSettingInformationAPI();
                const homeData = await getSiteHomeAPI();
                const userData = await verifyUserAPI();
                const rolesData = await getAllUserRoleExceptAdminAPI();
                const frontPageData = await getAllFrontPageAPI();

                // Set fetched data
                setSiteSettingData(siteInfoData?.data || []);
                setSiteData(homeData?.data || []);
                setUser(userData?.status ? userData?.data : {});
                setBeneficiaryRoles(rolesData?.status ? rolesData?.data : []);
                setUserRoles(rolesData?.status ? rolesData?.data?.map(role => role.name) : []);
                setSiteSettingData(siteInfoData?.data || {});
                setFrontPage(frontPageData?.data?.docs);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []); 

    const handleDashboard = () => {

        if (user?.role === "admin" || user?.role === "employee") {
            router.push(`/admin/`);

        } else if (user?.role === "accountant") {
            router.push(`/accountant/`);

        } else if (userRole.includes(user?.role) && (user?.role !== "accountant") && (user?.role !== "admin")) {
            router.push(`/user/`);
        }
    }

    // handle logout
    const handleLogout = () => {
        localStorage.removeItem("taxstickToken");
        window.location.reload();
    }

    // filter menu pages
    const menuData = frontPage?.filter(data => data?.type === "menu");

    const handlePage = async (_id) => {
        await router.push(`/v3/page?_id=${_id}`)
    }

    const handleRouteChange = async (_id) => {
        await router.push(`/v3/front-end?_id=${_id}`)
    }

    const handleLinkClick = (linkName, path) => {
        setActiveLink(linkName);
        setIsOpen(false);
        if (path) {
            router.push(path);
        }
    };

    const toggleDropdown = (linkName) => {
        setOpenDropdown(prev => (prev === linkName ? '' : linkName));
    };

    const handleMouseEnter = (linkName) => {
        clearTimeout(dropdownTimeout);
        const timeout = setTimeout(() => {
            setOpenDropdown(linkName);
        }, 300);
        setDropdownTimeout(timeout);
    };

    const handleMouseLeave = () => {
        clearTimeout(dropdownTimeout);
        setOpenDropdown('');
    };

    const renderLinks = () =>
        links.map((link, index) => (
            <div
                key={index}
                className="relative"
                onMouseEnter={() => handleMouseEnter(link.name)}
                onMouseLeave={handleMouseLeave}
            >
                <div className="flex items-center">
                    <p
                        className={`font-noto cursor-pointer text-[18px] font-medium ${activeLink === link.name ? 'text-[#10B981]' : 'text-[#fff]'}`}
                        onClick={() => !link.submenu && handleLinkClick(link.name, link.path)}
                    >
                        {link.name}
                    </p>
                    {link.submenu && (
                        <button onClick={() => toggleDropdown(link.name)}>
                            <span className="text-[#fff] text-2xl ml-2 relative bottom-2 md:bottom-2 lg:bottom-2">
                                {openDropdown === link.name ? '-' : '+'}
                            </span>
                        </button>
                    )}
                </div>

                {/* Hover-based dropdown for large screens */}
                {link.submenu && openDropdown === link.name && (
                    <div
                        className={`absolute hidden lg:block left-0 whitespace-pre !w-[200px] pt-2 bg-[${bgColor}] text-[#FFF] rounded-lg 
                        ${openDropdown === link.name ? 'animate-slideDown' : 'opacity-0 scale-y-0'}`}
                        onMouseEnter={() => setOpenDropdown(link.name)}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            animation: openDropdown === link.name ? 'slideDown 0.3s ease-out forwards' : 'none',
                        }}
                    >
                        {link.name === 'Tax Beneficiary' && (
                            beneficiaryRoles?.map((item, i) => (

                                <div className="" key={i + 1}>


                                    <div
                                        onClick={() => handlePage(item?._id)}
                                        className="cursor-pointer rounded-t py-3 px-6  whitespace-pre border-b-2 hover:text-[#10B981] space-x-2 flex items-center"
                                    >
                                        {
                                            item?.logo &&
                                            (
                                                <Image height={32} width={32} src={item?.logo} alt='image' className='h-8 w-8 object-contain ' />
                                            )
                                        }
                                        <span className='!text-[14px] md:!text-[16px]'> {item?.display_name}</span>
                                    </div>

                                </div>
                            ))
                        )}

                        {link.name === 'Page' && (
                            <div className='px-6'>
                                {menuData?.map((item) => (
                                    <div className="border-b-2" key={item?._id}>
                                        <span
                                            onClick={() => handleRouteChange(item?._id)}
                                            className="cursor-pointer rounded-t py-[8px] pr-[20px] block whitespace-no-wrap hover:text-[#10B981]"
                                        >
                                            {item.name}
                                        </span>
                                    </div>
                                ))}
                                <div className="border-b-2">
                                    <Link href="/v3/pricing">
                                        <div className="cursor-pointer rounded-t  py-[8px] pr-[20px] block whitespace-no-wrap hover:text-[#10B981]">
                                            Pricing
                                        </div>
                                    </Link>
                                </div>
                                <div className="">
                                    <Link href="/v3/faq">
                                        <div className="cursor-pointer rounded-t py-[8px] pr-[20px] block whitespace-no-wrap hover:text-[#10B981]">
                                            FAQ&apos;s
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Click-based dropdown for mobile screens */}
                {
                    link.submenu && openDropdown === link.name && isOpen && (
                        <div className={`lg:hidden absolute left-4 bg-[${bgColor}] text-[#FFF] rounded-lg z-50`}>
                            {link.name === 'Tax Beneficiary' && (
                                beneficiaryRoles?.map((item, i) => (
                                    <div className="" key={i + 1}>
                                        <div
                                            onClick={() => handlePage(item?._id)}
                                            className="cursor-pointer rounded-t py-4 px-6  whitespace-pre border-b-2 hover:text-[#10B981] flex space-x-2 items-center"
                                        >
                                            {
                                                item?.logo &&
                                                (
                                                    <Image height={32} width={32} src={item?.logo} alt='image' className='!h-8 !w-8 object-contain' />
                                                )
                                            }
                                            <span className='!text-[14px] md:!text-[16px]'> {item?.display_name}</span>
                                        </div>

                                    </div>
                                ))
                            )}

                            {link.name === 'Page' && (
                            <div className='px-6'>
                            {menuData?.map((item) => (
                                <div className="border-b-2" key={item?._id}>
                                    <span
                                        onClick={() => handleRouteChange(item?._id)}
                                        className="cursor-pointer rounded-t py-[8px] pr-[20px] block whitespace-no-wrap hover:text-[#10B981]"
                                    >
                                        {item.name}
                                    </span>
                                </div>
                            ))}
                            <div className="border-b-2">
                                <Link href="/v3/pricing">
                                    <div className="cursor-pointer rounded-t  py-[8px] pr-[20px] block whitespace-no-wrap hover:text-[#10B981]">
                                        Pricing
                                    </div>
                                </Link>
                            </div>
                            <div className="">
                                <Link href="/v3/faq">
                                    <div className="cursor-pointer rounded-t py-[8px] pr-[20px] block whitespace-no-wrap hover:text-[#10B981]">
                                        FAQ&apos;s
                                    </div>
                                </Link>
                            </div>
                        </div>
                            )}
                        </div>
                    )
                }
            </div >
        ));

    return (
        <nav className="w-full h-fit relative z-50 mt-16 lg:mt-0">
            <div className="max-w-[1320px] px-2 md:px-0 mx-auto flex items-center justify-between">
                <Link href="/">
                    <div className='md:w-[160px] md:h-[35px] w-[100px] h-[28px] '>

                        <Image
                            src={getSiteSettingData?.logo || "/v3/logo.png"}
                            alt="logoImage"
                            width={160}
                            height={40}
                            className='cursor-pointer '
                        />
                    </div>
                </Link>

                <div className="lg:hidden absolute flex left-1/2 transform -translate-x-1/2 ml-8 group cursor-pointer">
                    {user.role ? (
                        <div
                            style={{ borderRadius: radius }}
                            className="button !px-5 !py-3 sm:px-10 sm:py-[22px] flex cursor-pointer"
                        >
                            <IoPerson className="mr-2 text-lg" /> <span>{user?.role ?? ""}</span>
                        </div>
                    ) : (
                        <div
                            style={{ borderRadius: radius }}
                            className="button !px-5 !py-3 sm:px-10 sm:py-[22px] flex cursor-pointer"
                        >
                            <IoPerson className="mt-1 mr-2 text-[16px]" /> <span className='text-[14px]'>Login / Register</span>
                        </div>
                    )}
                    <ul
                        className="absolute hidden pt-11 md:pt-14 mt-0 md:mt-12  font-semibold text-white rounded-md group-hover:block transition duration-300 delay-200"
                        
                    >
                        {user.role ? (
                            <div className=''>
                                <li>
                                    <span
                                        onClick={handleLogout}
                                        className="cursor-pointer py-[4px] pr-[24px] block whitespace-no-wrap hover:underline"
                                    >
                                        Logout
                                    </span>
                                </li>
                                <span className="border-b-2 block mr-[24px]"></span>
                                <li>
                                    <span
                                        onClick={handleDashboard}
                                        className="cursor-pointer py-[4px] pr-[24px] block whitespace-no-wrap hover:underline"
                                    >
                                        Dashboard
                                    </span>
                                </li>
                            </div>
                        ) : (
                            <Link href="/login">
                                <li className='sm:mt-7 '>
                                    <span

                                        className="text-sm md:text-lg  rounded-xl cursor-pointer  hover:underline pt-1 px-4 block whitespace-no-wrap"
                                    >
                                        Login
                                    </span>
                                </li>
                            </Link>
                        )}
                    </ul>
                </div>


                <div className="lg:hidden flex flex-col justify-center">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-[#fff] focus:outline-none absolute right-4"
                    >
                        {isOpen ? (
                            <IoMdCloseCircle className="text-3xl" />
                        ) : (
                            <GiHamburgerMenu className="text-3xl" />
                        )}
                    </button>
                </div>

                <div className="hidden lg:flex items-center text-[18px] font-medium text-[#fff] space-x-10 ">
                    {renderLinks()}
                </div>

                <div className="relative hidden lg:flex justify-center lg:justify-end group">
                    {/* Button */}
                    {user.role ? (
                        <div
                            style={{ borderRadius: radius }}
                            className="button !px-4 !py-2 sm:px-7 sm:py-4 flex items-center cursor-pointer"
                        >
                            <IoPerson className="mt-1 mr-2 text-xl" />
                            <span>{user?.role ?? ""}</span>
                        </div>
                    ) : (
                        <div
                            style={{ borderRadius: radius }}
                            className="button !px-4 !py-2 sm:px-7 sm:py-4 flex items-center cursor-pointer"
                        >
                            <IoPerson className="mt-1 mr-2 text-xl" />
                            <span>Login / Register</span>
                        </div>
                    )}

                    {/* Dropdown */}
                    <ul className="absolute hidden group-hover:flex flex-col pt-8 font-semibold text-white rounded-md">
                        {user.role ? (
                            <div className="p-4">
                                <li className="py-1">
                                    <span
                                        onClick={handleLogout}
                                        className="cursor-pointer block whitespace-nowrap hover:underline"
                                    >
                                        Logout
                                    </span>
                                </li>
                                <div className="border-b-2 my-2"></div>
                                <li className="py-1">
                                    <span
                                        onClick={handleDashboard}
                                        className="cursor-pointer block whitespace-nowrap hover:underline"
                                    >
                                        Dashboard
                                    </span>
                                </li>
                            </div>
                        ) : (
                            <Link href="/login">
                                <li>
                                    <span

                                        className="text-lg cursor-pointer hover:underline pt-3 pr-[22px] block whitespace-no-wrap"
                                    >
                                        Login
                                    </span>
                                </li>
                            </Link>
                        )}
                    </ul>
                </div>



            </div>

            {isOpen && (
                <div className={`lg:hidden bg-[#102D33] rounded absolute top-16 left-0 w-1/2 sm:w-2/5 md:w-1/3 z-50 flex flex-col text-[18px] font-medium px-4`}>
                    {renderLinks()}
                </div>
            )}
        </nav>
    );
};

export default Navbar;

