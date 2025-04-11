import { useState, useEffect } from "react";
import { getSiteSettingInformationAPI } from "../helpers/backend_helper";

// Import all layout components
import HomeLayoutV3 from "./homeLayoutV3";
import Home2LayoutV3 from "./homeLayou2V3";
import Home3LayoutV3 from "./homeLayout3V3";
import HomeLayoutV2 from "./homeLaoutV2";

const MainLayout = ({ children }) => {
    const [siteInformationData, setSiteInformation] = useState({});
    const [LayoutComponent, setLayoutComponent] = useState(null);

    // Fetch site information data on load
    useEffect(() => {
        const fetchData = async () => {
            const data = await getSiteSettingInformationAPI();
            setSiteInformation(data?.data);
            selectLayout(data?.data);
        };

        fetchData();
    }, []);

    // Conditional layout selection
    const selectLayout = (data) => {
        const number = data?.update_version?.number;
        const theme = data?.update_version?.theme;

        if (number === 'v3' && theme === 'one') {
            setLayoutComponent(<HomeLayoutV3>{children}</HomeLayoutV3>);
        } else if (number === 'v3' && theme === 'two') {
            setLayoutComponent(<Home2LayoutV3>{children}</Home2LayoutV3>);
        } else if (number === 'v3' && theme === 'three') {
            setLayoutComponent(<Home3LayoutV3>{children}</Home3LayoutV3>);
        } else if (number === 'v2' && theme === 'one') {
            setLayoutComponent(<HomeLayoutV2>{children}</HomeLayoutV2>);
        } else {
            setLayoutComponent(<div>No matching layout found</div>);
        }
    };

    return LayoutComponent || <div className="p-4 space-y-4 animate-pulse">
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
};

export default MainLayout;
