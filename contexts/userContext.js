import { useContext, createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Spin } from "antd";
import { getAllUserRoleExceptAdminAPI, verifyUserAPI } from "../helpers/backend_helper";

export const UserContext = createContext({ user: undefined });

export function UserContextProvider(props) {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    const router = useRouter();

    // fetch all user roles
    const [userRoles, setUserRoles] = useState([]);
    useEffect(() => {
        getAllUserRoleExceptAdminAPI().then(res => {
            if (res?.status === true) {
                let arrayOfRole = [];
                res?.data?.forEach(el => {
                    arrayOfRole.push(el.name)
                })
                setUserRoles(arrayOfRole)
            }
        })

    }, [user?.role])


    const verify = () => {

        verifyUserAPI().then((data) => {
            if (data?.error?.name === 'TokenExpiredError') {
                localStorage.removeItem("taxstickToken");
                router.push('/login/')
            }

            if (data?.status === true) {
                setUser(data.data);
                setAuthenticated(true);
            }

            const urlPath = router.pathname.split('/');

            if (urlPath[1] === 'admin') {
                const roles = ['admin', 'employee']
                if (!roles?.includes(data?.data?.role)) {
                    localStorage.removeItem("taxstickToken");
                    router.push('/login/');
                }

            } else if (urlPath[1] === 'accountant') {
                if (data?.data?.role !== "accountant") {
                    localStorage.removeItem("taxstickToken");
                    router.push('/login/');
                }

            } else if (urlPath[1] === 'user') {
                if ((data?.status !== true) || (data?.data?.role === "accountant")|| (data?.data?.role === "admin")) {
                    localStorage.removeItem("taxstickToken");
                    router.push('/login/');
                }
            }
        });
    };


    const logout = () => {
        if (authenticated) <Spin />;
        setAuthenticated(false);
        localStorage.removeItem("taxstickToken");
        router.push("/login");
    };


    useEffect(() => {
        if (authenticated === false) {
            verify();
        }
    }, []);


    return (
        <UserContext.Provider value={{ user, logout, verify }}>
            {props.children}
        </UserContext.Provider>
    );
}

// by calling this function, we can easily access user's properties
export const useUser = () => {
    return useContext(UserContext);
};