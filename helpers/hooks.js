import {useEffect, useState} from 'react';
import swalAlert from "../components/common/alert";
import {useRouter} from "next/router";
import {hideLoader, showLoader} from "../components/common/preloader";

export const useFetch = (func, query, load = true) => {
    const router = useRouter()
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [params, setParams] = useState({
        ...query,
        page: query?.page || 1,
        size: query?.size || 20,
    })

    useEffect(() => {
        if(load) {
            getData(params)
        }
    }, []);

    const getData = (query) => {
        setLoading(true)
        setError(false)
        setParams({...params, ...query})
        func({...params, ...query}).then(({error, data, msg, meta, ...rest}) => {
            setLoading(false)
            if(error === false) {
                setData(data)
            } else {
                setError(true)
                setErrorMessage(msg)
            }
            if(rest) {
                if((Object.values(rest) + "").replaceAll(',', '') === 'Unauthorized.') {
                    router.push('/login')
                }
            }

        }).catch(e => {
            console.log(e)
        })
    }
    return [data, getData, {query: params, loading, error, errorMessage}];
}




export const userAction = async (func, data, reload, alert = true) => {
    showLoader()
    const {status, message, data: d} = await func({...data})
    hideLoader()
    if(status === true) {
        if(reload) {
            reload(d)
        }
        if(alert) {
            await swalAlert.success(message)
        }
    } else {
        await swalAlert.error(message)
    }
}

export const userActionConfirm = async (func, data, reload, message, confirmText) => {
    const {isConfirmed} = await swalAlert.confirm(message, confirmText)
    if(isConfirmed) {
        await userAction(func, data, reload, true)
    }
}


export const useOutSideClick = (ref, func) => {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                func && func()
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
    return
}
