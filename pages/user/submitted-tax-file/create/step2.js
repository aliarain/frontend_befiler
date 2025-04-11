import React, { useEffect, useState } from 'react';
import UserLayout from '../../../../layout/userLayout';
import { useRouter } from 'next/router';
import { getSpecificUserRoleAPI, getSpecificUserRoleFormDataAPI } from '../../../../helpers/backend_helper';
import TaxFileForm2 from '../../../../components/user/form/TaxFileForm2';
import { useUser } from '../../../../contexts/userContext';
import Head from 'next/head';


const CreateStep2 = () => {
    const { user } = useUser();
    const router = useRouter();
    const { query } = router;

    const { formID, year } = query;
    const [taxFormFields, setTaxFormFields] = useState({});
    const [specificUserRole, setSpecificUserRole] = useState({});

    // get specific user-role data
    useEffect(() => {
        getSpecificUserRoleAPI({ role: user?.role }).then(res => {
            if (res?.status === true) {
                setSpecificUserRole(res?.data)
            }
        })
    }, [user?.role])


    // tax form fields fetch
    useEffect(() => {
        const userNameData = { user_name: specificUserRole?._id }
        getSpecificUserRoleFormDataAPI(userNameData).then(data => {
            if (data?.status === true) {
                setTaxFormFields(data?.data)
            }
        })
    }, [specificUserRole?._id])


    // checking field, is permitted or not by admin
    function checkFieldStatus(fieldName) {
        let status;
        taxFormFields?.step_two?.forEach(element => {
            if (element.input_name === fieldName) {
                status = element.status
            }
        });
        return status;
    }


    return (
        <div>
            <section className='min-h-screen p-4'>
                <Head>
                    <title>Tax File Form Step 2</title>
                </Head>


                <div className='main-form__container relative pb-5 pt-4'>

                    {/* header section of form */}
                    <div className=''>
                        <div className='-space-y-3'>
                            <p className='text-center text-gray-600 text-base'>Add Your Tax Files</p>
                            <p className='text-center text-gray-600'>This information will let us know more about you.</p>
                        </div>
                        <div className='grid grid-cols-2 mt-4 text-center'>
                            <div className='bg-gray-300 py-2 my-1 font-semibold'>ABOUT YOU</div>
                            <div className='bg-red-500 py-3 rounded-sm text-white font-semibold'>INCOME SUMMARY</div>
                        </div>
                    </div>


                    {/* form section */}
                    <div className='mt-5 px-5'>
                        <TaxFileForm2 year={year} formID={formID} checkFieldStatus={checkFieldStatus} formFieldsData={taxFormFields?.step_two} />
                    </div>
                </div>

            </section>
        </div>
    );
};
CreateStep2.layout = UserLayout;
export default CreateStep2;