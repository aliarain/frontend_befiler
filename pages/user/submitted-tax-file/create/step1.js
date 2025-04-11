import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import UserLayout from '../../../../layout/userLayout';
import { getAllByUserRoleProvinceAPI, getSpecificUserRoleAPI, getSpecificUserRoleFormDataAPI } from '../../../../helpers/backend_helper';
import TaxFileForm1 from '../../../../components/user/form/taxFileForm1';
import { useUser } from '../../../../contexts/userContext';
import Head from 'next/head';


const CreateStep1 = () => {
    const { user, verify } = useUser();
    const router = useRouter();
    const { query } = router;
    const year = query?.year;

    const [provinceData, setProvinceData] = useState([]);
    const [taxFormFields, setTaxFormFields] = useState({});
    const [specificUserRole, setSpecificUserRole] = useState({});


    // province fetch
    useEffect(() => {
        getAllByUserRoleProvinceAPI().then(data => {
            if (data?.status === true) {
                setProvinceData(data?.data?.docs)
            }
        })
    }, [])


    // get specific user-role data
    useEffect(() => {
        getSpecificUserRoleAPI({ role: user?.role }).then(res => {
            if (res?.status === true) {
                setSpecificUserRole(res?.data)
            }
        })

        verify()
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


    const handleFormCancel = () => {
        router.push('/user/submitted-tax-file')
    }


    // checking field, is permitted or not by admin
    function checkFieldStatus(fieldName) {
        let status;
        taxFormFields?.step_one?.forEach(element => {
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
                    <title>Tax File Form Step 1</title>
                </Head>


                <div className='main-form__container relative pb-5 pt-4'>

                    {/* header section of form */}
                    <div className=''>
                        <div className='-space-y-3'>
                            <p className='text-center text-gray-600 text-base'>Add Your Tax Files</p>
                            <p className='text-center text-gray-600'>This information will let us know more about you.</p>
                        </div>
                        <div className='grid grid-cols-2 mt-4 text-center'>
                            <div className='bg-red-500 py-3 rounded-sm text-white font-semibold'>ABOUT YOU</div>
                            <div className='bg-gray-300 py-2 my-1 font-semibold'>INCOME SUMMARY</div>
                        </div>
                    </div>


                    {/* form section */}
                    <div className='mt-5 px-5'>
                        <TaxFileForm1 handleFormCancel={handleFormCancel} provinceData={provinceData} year={year} checkFieldStatus={checkFieldStatus} formFieldsData={taxFormFields?.step_one} />
                    </div>
                </div>

            </section>
        </div>
    );
};
CreateStep1.layout = UserLayout;
export default CreateStep1;