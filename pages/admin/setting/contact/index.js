import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { getOneCustomerQueryAPI} from '../../../../helpers/backend_helper';
import AdminLayout from '../../../../layout/adminLayout';
import CustomerQueryDetails from './details';
import ReplyQuery from './reply';
import FrontEndPageDetails from "../pageCreate/details";


// customer question answer and details
const CustomerContact = () => {
    const router = useRouter();
    const [customerEmail, setCustomerEmail] = useState({});
    const { query } = router;

    // fetch specific user query
    useEffect(() => {
        const data = { id: query?.id }
        getOneCustomerQueryAPI(data).then(data => {
            setCustomerEmail(data?.data);
        })
    }, [query?.id])


    return (
        <>
            <div className='md:grid md:grid-cols-2 gap-[2%] m-[2%] min-h-screen'>
                <CustomerQueryDetails customerEmail={customerEmail}/>
                <ReplyQuery customerEmail={customerEmail}/>
            </div>
        </>
    );
};
CustomerContact.layout = AdminLayout
export default CustomerContact;