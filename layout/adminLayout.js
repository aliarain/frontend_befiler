import {
    MdDashboard,
    MdEditNote,
    MdRule,
    MdOutlineCenterFocusStrong,
    MdAccountCircle,
    MdPowerSettingsNew,
    MdLocationOn,
    MdCode,
    MdAnnouncement,
    MdSettings,
    MdFeedback,
    MdGrading,
    MdPublishedWithChanges,
    MdTextsms,
    MdEmail,
    MdManageAccounts, MdAttachEmail, MdOutlineSupportAgent
} from "react-icons/md";
import {CgFileDocument} from "react-icons/cg";
import {
    AiFillDollarCircle,
    AiFillSetting,
    AiOutlineDashboard,
    AiOutlineFieldTime,
    AiOutlineUsergroupAdd
} from "react-icons/ai";
import {RiPagesFill} from "react-icons/ri";
import {
    FaQrcode,
    FaQuestionCircle,
    FaRegCheckSquare,
    FaSms,
    FaStar,
    FaTools,
    FaUniversity,
    FaUsers, FaWrench
} from "react-icons/fa";
import Sidebar from "../components/admin/dashboard/sidebar.js";
import Header from "../components/admin/dashboard/header.js";
import {TiContacts} from "react-icons/ti";
import {FiHelpCircle} from "react-icons/fi";
import I18nContext, {initI18n} from "../contexts/i18n";
import UserContext from "../contexts/user";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {verifyUserAPI} from "../helpers/backend_helper";
import {BiDollar} from "react-icons/bi";
import {BsCashCoin} from "react-icons/bs";
import {GrUserSettings,GrOrganization} from "react-icons/gr";
import {HiTicket} from "react-icons/hi";
import {SiKnowledgebase} from "react-icons/si";

import {Skeleton} from "antd";


const AdminLayout = ({children}) => {
    const router = useRouter()
    const [user, setUser] = useState(null);
    const i18n = initI18n()

    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = () => {
        verifyUserAPI().then(async (userData) => {
            if (userData?.status === true && (userData?.data?.role === "admin" || userData?.data?.role === "employee")) {
                setUser({...userData?.data})
            } else {
                localStorage.removeItem("taxstickToken")
                await router.push('/login')
            }
        })
    }

    const menu = getMenu(user)

    if (user===null) {
        return (<div className="md:px-[10%] space-y-10 md:mt-[7%]">
            <Skeleton active={true} />
            <Skeleton active={true} />
            <Skeleton active={true} />
        </div>)
    }

    return (
        <I18nContext.Provider value={i18n}>
            <UserContext.Provider value={{...user, getProfile}}>
                <div className="dashboard">
                    <Sidebar menu={menu}/>
                    <Header/>
                    <div className="absolute top-0 h-32 w-full bg-main"/>
                    <div className="main-content">
                        <div className="w-full z-30" style={{minHeight: 400}}>
                            {children}
                        </div>
                    </div>
                </div>
            </UserContext.Provider>
        </I18nContext.Provider>
    )
}

export default AdminLayout;


const menu = [
    {
        label: 'Dashboard',
        icon: MdDashboard,
        href: '/admin',
        permissions: ['admin', 'employee']
    },
    {
        label: 'Live Site',
        icon: MdOutlineCenterFocusStrong,
        href: '/',
        permissions: ['admin', 'live_site']
    },
    {
        label: 'Admin Tax Files',
        icon: MdAccountCircle,
        href: '/admin/taxfiles',
        permissions: ['admin', 'taxfiles']
    },
    {
        label: 'User Form Fields',
        icon: MdPowerSettingsNew,
        href: '/admin/user-form-fields',
        permissions: ['admin', 'user_form_fields']
    },
    {
        label: 'Users',
        icon: MdAccountCircle,
        href: '/admin/users',
        permissions: ['admin', 'users']
    },
    {
        label: 'Province',
        icon: MdLocationOn,
        href: '/admin/province',
        permissions: ['admin', 'province']
    },
    {
        label: 'Coupon',
        icon: MdCode,
        href: '/admin/coupons',
        permissions: ['admin', 'coupon']
    },
    {
        label: 'Roles & Permission',
        icon: MdAnnouncement,
        permissions: ['admin', 'role_and_permission'],
        child: [
            {
                label: 'Roles',
                icon: MdEditNote,
                href: '/admin/roles',
            },
            {
                label: 'Add User Role',
                icon: MdEditNote,
                href: '/admin/add-new-role',
            },
        ]
    },
    {
        label: 'HRM',
        icon: FaUsers,
        child: [
            {
                label: 'All Employee',
                icon: FaUsers,
                href: '/admin/hrm',
                childHrefs: ['/admin/hrm/add', "/admin/hrm/[_id]"],
                permissions: ['admin', 'hrm_all_employee_show']
            },
            {
                label: 'Departments',
                icon: FaUniversity,
                href: '/admin/hrm/departments',
                childHrefs: ['/admin/hrm/department/add', "/admin/hrm/department/[_id]"],
                permissions: ['admin', 'hrm_department_show']
            },
            {
                label: 'Roles & Permissions',
                icon: FaStar,
                href: '/admin/hrm/roles',
                childHrefs: ['/admin/hrm/roles', "/admin/hrm/roles/[_id]"],
                permissions: ['admin', 'hrm_role_permission_show']
            },
            {
                label: 'Attendance',
                icon: FaRegCheckSquare,
                href: '/admin/hrm/attendance',
                childHrefs: ['/admin/hrm/attendance/add', "/admin/hrm/attendance/[_id]"],
                permissions: ['admin', 'hrm_attendance_show']
            },
            {
                label: 'Attendance Settings',
                icon: AiFillSetting,
                href: '/admin/hrm/attendance/setting',
                childHrefs: ['/admin/hrm/attendance/settings/add', "/admin/hrm/attendance/settings/[_id]"],
                permissions: ['admin', 'hrm_attendance_settings_show']
            },
            {
                label: 'Time Sheet',
                icon: AiOutlineFieldTime,
                href: '/admin/hrm/time-sheet/details',
                childHrefs: ['/admin/hrm/time-sheet/add', "/admin/hrm/time-sheet/[_id]"],
                permissions: ['admin', 'hrm_time_sheet_show']
            },
            {
                label: 'Holidays',
                icon: MdGrading,
                href: '/admin/hrm/holiday',
                childHrefs: ['/admin/hrm/holiday/add', "/admin/hrm/holiday/[_id]"],
                permissions: ['admin', 'hrm_holidays_show']
            },
            {
                label: 'Leaves',
                icon: MdPublishedWithChanges,
                href: '/admin/hrm/leave',
                childHrefs: ['/admin/hrm/leave/add', "/admin/hrm/leave/[_id]"],
                permissions: ['admin', 'hrm_leaves_show']
            },
            {
                label: 'Leaves Setting',
                icon: FaTools,
                href: '/admin/hrm/leave/setting',
                childHrefs: ['/admin/hrm/leave/setting/add', "/admin/hrm/leave/setting/[_id]"],
                permissions: ['admin', 'hrm_leaves_setting_show']
            },
        ]
    },
    {
        label: 'Payroll',
        icon: BiDollar,
        child: [
            {
                label: 'Employee Salary',
                icon: BsCashCoin,
                href: '/admin/payroll/employee-salary',
                childHrefs: ['/admin/payroll/employee-salary', "/admin/payroll/employee-salary/[_id]"],
                permissions: ['admin', 'payroll_employee_salary_show']
            },
            {
                label: 'Advance Salary',
                icon: FaRegCheckSquare,
                href: '/admin/payroll/advance-salary',
                childHrefs: ['/admin/payroll/advance-salary/add', "/admin/payroll/advance-salary/[_id]"],
                permissions: ['admin', 'payroll_advance_salary_show']
            },
            {
                label: 'Salary Settings',
                icon: AiFillSetting,
                href: '/admin/payroll/salary-settings',
                childHrefs: ['/admin/payroll/salary-settings/add', "/admin/payroll/salary-settings/[_id]"],
                permissions: ['admin', 'payroll_salary_settings_show']
            },
        ]
    },
    {
        label: 'Support Ticket',
        icon: FaWrench,
        permissions: ['admin', "ticket"],
        child: [
            {
                label: 'Tickets',
                icon: HiTicket,
                href: '/admin/ticket/tickets',
            },
            {
                label: 'Agents',
                icon: MdOutlineSupportAgent,
                href: '/admin/ticket/agents',
            },
            {
                label: 'Settings',
                icon: GrUserSettings,
                href: '/admin/ticket/setting',
            }
        ]
    },
    {
        label: 'Employee Tickets',
        icon: FaUsers,
        href: '/admin/employee/tickets',
        permissions: ['admin', "employee_ticket"],
    },
    {
        label: 'Marketing',
        icon: FaQrcode,
        permissions: ['admin', 'marketing'],
        child: [
            {
                label: 'Dashboard',
                icon: AiOutlineDashboard,
                href: '/admin/marketing',
            },
            {
                label: 'SMS options',
                icon: MdTextsms,
                href: '/admin/marketing/sms',
            },
            {
                label: 'WhatsApp options',
                icon: FaQrcode,
                href: '/admin/marketing/whatsapp',
            },
            {
                label: 'Email options',
                icon: MdEmail,
                href: '/admin/marketing/email',
            },
            {
                label: 'Manage User',
                icon: MdManageAccounts,
                href: '/admin/marketing/manage_user',
            },
            {
                label: 'Manage Group',
                icon: AiOutlineUsergroupAdd,
                href: '/admin/marketing/manage_group',
            },
            {
                label: 'SMS Settings',
                icon: FaSms,
                href: '/admin/marketing/sms_settings',
            },
            {
                label: 'WhatsApp Settings',
                icon: FaQrcode,
                href: '/admin/marketing/whatsapp_setting',
            },
            {
                label: 'Email Settings',
                icon: MdAttachEmail,
                href: '/admin/marketing/email_setting',
            },
        ]
    },
    {
        label: 'Website Setting',
        icon: MdSettings,
        permissions: ['admin', 'website_setting'],
        child: [
            {
                label: 'User Feedbacks',
                icon: MdFeedback,
                href: '/admin/setting/feedbacks',
            },
            {
                label: 'Customer Contact',
                icon: TiContacts,
                href: '/admin/setting/contacts',
            },
            {
                label: 'TaxFile Pricing',
                icon: AiFillDollarCircle,
                href: '/admin/setting/taxfile-pricing',
            },
            {
                label: 'FrontEnd Pages',
                icon: RiPagesFill,
                href: '/admin/setting/frontend-pages',
            },
            {
                label: 'FAQ Setting',
                icon: FaQuestionCircle,
                href: '/admin/setting/faq',
            },
            {
                label: 'Site Setting',
                icon: FaTools,
                href: '/admin/setting/site-setting',
            },
        ]
    },
    {
        label: 'Need Help ?',
        icon: FiHelpCircle,
        permissions: ['admin', 'documentation'],
        child: [
            {
                label: 'Documentation',
                icon: CgFileDocument,
                href: 'https://documentation.taxstick.appstick.com.bd/',
            },
        ]
    },
]

const getMenu = user => {
    const router = useRouter()
    const hasPermission = menu => {
        if (menu.permission && havePermission(menu.permission, [user?.permission])) {
            return true
        }
        if (menu.permissions) {
            for (let permission of menu.permissions) {
                if (havePermission(permission, [user?.permission])) {
                    return true
                }
            }
        }
        if (menu.permissions) {
            for (let permission of menu.permissions) {
                if (roleWisePermission(permission, [user?.role])) {
                    return true
                }
            }
        }
        if (process.browser) {
            if (router?.pathname === menu.href && user) {
                router?.push('/').then(() => {
                })
            }
        }
        return false
    }
    return menu?.map(d => ({...d, href: d.href?.replace('[_id]', user?._id)})).filter(menu => {
        if (+user?.profile?.is_owner === 1) {
            return true
        } else if (menu?.permission === 'any' || menu?.permission === 'admin') {
            return true
        } else if (menu.permission || menu.permissions) {
            return hasPermission(menu)
        } else if (Array.isArray(menu.child)) {
            menu.child = menu.child.filter(child => {
                return hasPermission(child)
            })
            return menu.child.length > 0
        }
        return false
    })
}

export const havePermission = (permission, roles) => {
    for (let role of roles || []) {
        if (role?.permissions?.includes(permission)) {
            return true
        }
    }
    return false
}

export const havePermission1 = (permission, roles) => {
    if (roles?.permissions?.includes(permission)) {
        return true
    }
    return false
}

export const roleWisePermission = (permission, roles) => {
    for (let role of roles || []) {
        if (role === permission) {
            return true
        }
    }
    return false
}
