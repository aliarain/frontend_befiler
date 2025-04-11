import React, { useState } from 'react';
import Sidebar from '../shared/sidebar/sidebar';
import Backdrop from '../shared/sidebar/backdrop';
import { useEffect } from 'react';
import { getAllUserRoleExceptAdminAPI } from '../../../helpers/backend_helper';
import dynamic from "next/dynamic";
const Navbar = dynamic(() => { return import('../shared/navbar/navbar.js'); },
    { ssr: false }
);


const Menu = ({ siteData }) => {
    const [serviceRole, setServiceRole] = useState();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // tax service holder
    useEffect(() => {
        getAllUserRoleExceptAdminAPI().then((data) => {
            setServiceRole(data?.data);
        })
    }, [])

    const handleOpenSidebar = () => {
        setSidebarOpen(true);
    }
    
    const handleCloseSideBar = () => {
        setSidebarOpen(false)
    }

    let sidebar;
    if (sidebarOpen) {
        sidebar = <Sidebar role={serviceRole} siteData={siteData} handleCloseSideBar={handleCloseSideBar} />;
    }


    return (
        <div className='h-[100%]'>
            <Navbar role={serviceRole} handleOpenSidebar={handleOpenSidebar} />
            {sidebar}

            {/* {backdrop} */}
            <Backdrop show={sidebarOpen} handleCloseSideBar={handleCloseSideBar} />
        </div>
    );
};

export default Menu;