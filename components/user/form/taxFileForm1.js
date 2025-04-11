import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Select, message } from 'antd';
const { Option } = Select;
import { AWSFileUploadAPI, createTaxFile, editUserAPI } from '../../../helpers/backend_helper';
import { toast, ToastContainer } from 'react-toastify';
import ScaleLoader from "react-spinners/ScaleLoader";
import jwt_decode from "jwt-decode";
import FormInput from '../utils/inputText';
import FormSwitch from '../utils/switch';
import FormNumber from '../utils/inputNumber';
import FormTextArea from '../utils/inputTextArea';
import FormDateInput from '../utils/inputDate';
import FormTimeInput from '../utils/inputTime';
import FormInputSelect from '../utils/inputSelect';
import FormInputRadioButton from '../utils/inputRadioButton';
import DigitalSignature from '../utils/digitalSignature';
import InputCheckbox from '../utils/inputCheckbox';
import InputImageUpload from '../utils/inputImageUpload';
import InputFileUpload from '../utils/inputFile';

// First char capitalize
function capitalizeFirstLetter(string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
}


// user form fill up -> step 1
const TaxFileForm1 = ({ handleFormCancel, provinceData, year, checkFieldStatus, formFieldsData = [] }) => {
    const [form] = Form.useForm();
    const digitalSignatureRef = useRef();
    const [signature, setSignature] = useState('');
    const [refreshState, setRefreshState] = useState(null);
    const [maritalStatus, setMaritalStatus] = useState('');

    const router = useRouter();

    // user image handling
    const [fileLoading, setFileLoading] = useState({ isloading: false, inputName: '' });
    const [images, setImages] = useState([]);
    const handleImage = async (e, input_name) => {
        const files = ['image/jpeg', 'image/png', 'image/jpg'];

        if (files.includes(e.target.files[0].type) && (e.target.files[0].size <= 3145728)) {

            const obj = {};
            setFileLoading({ isloading: true, inputName: input_name });

            const data = new FormData()
            data.append('file', e.target.files[0])

            AWSFileUploadAPI(data).then(url => {
                if (url?.url) {

                    obj[input_name] = url?.url;

                    const duplicateV = images?.find(dt => dt[input_name]);

                    if (!!duplicateV) {
                        const filterObj = images?.filter(dt => !dt[input_name])
                        setImages([...filterObj, obj])

                    } else {
                        setImages(pre => [...pre, obj])
                    }

                    setFileLoading({ isloading: false, inputName: '' });

                } else {
                    toast.warning("Something went wrong!")
                }
            });

        } else {
            toast.warning("The file must be an image!")
        }
    };


    // user file handling
    const [files, setFiles] = useState([]);
    const handleFile = async (e, input_name) => {
        const fileSupport = ['image/jpeg', 'application/pdf', 'image/png', 'image/jpg', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/zip', 'application/vnd.rar'];

        if (fileSupport.includes(e.target.files[0].type) && (e.target.files[0].size <= 5242880)) {

            const obj = {};
            setFileLoading({ isloading: true, inputName: input_name });

            const data = new FormData()
            data.append('file', e.target.files[0])

            AWSFileUploadAPI(data).then(url => {
                if (url?.url) {

                    obj[input_name] = url?.url;

                    const duplicateV = files?.find(dt => dt[input_name]);

                    if (!!duplicateV) {
                        const filterObj = files?.filter(dt => !dt[input_name])
                        setFiles([...filterObj, obj])

                    } else {
                        setFiles(pre => [...pre, obj])
                    }

                    setFileLoading({ isloading: false, inputName: '' });

                } else {
                    toast.warning("Something went wrong!")
                }
            });

        } else {
            toast.warning("Maximum file size is 5 MB! Valid files are image, csv, pdf, excel")
        }
    };


    // digital signature
    const handleDigitalSignatureClear = () => {
        digitalSignatureRef.current?.clear();
    }
    const handleDigitalSignatureData = () => {
        const digitalSignature = digitalSignatureRef.current?.toDataURL('jpg');
        setSignature(digitalSignature)
        toast.success('Your signature has stored successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }


    // Times handling and managing
    const [timePickUpName, setTimePickUpName] = useState('');
    const [timePickUpArr, setTimePickUpArr] = useState([]);
    // input on change value get
    const handleTimePickUp = (time, timeString) => {
        const obj = {};
        obj[timePickUpName] = timeString;
        const duplicateV = timePickUpArr?.find(dt => dt[timePickUpName])

        if (!!duplicateV) {
            const filterObj = timePickUpArr?.filter(dt => !dt[timePickUpName])
            setTimePickUpArr([...filterObj, obj])

        } else {
            setTimePickUpArr(pre => [...pre, obj])
        }
    }
    // input on focus value get
    const handleTimeField = (fieldName) => {
        setTimePickUpName(fieldName)
    }


    // Date handling and managing
    const [datePickUpName, setDatePickUpName] = useState('');
    const [datePickUpArr, setDatePickUpArr] = useState([]);
    // input on change value get
    const handleDatePickUp = (date, dateString) => {
        const obj = {};
        obj[datePickUpName] = dateString;
        const duplicateV = datePickUpArr?.find(dt => dt[datePickUpName])

        if (!!duplicateV) {
            const filterObj = datePickUpArr?.filter(dt => !dt[datePickUpName])
            setDatePickUpArr([...filterObj, obj]);

        } else {
            setDatePickUpArr(pre => [...pre, obj])
        }
    }
    // input on focus value
    const handleDateField = (fieldName) => {
        setDatePickUpName(fieldName)
    }


    // handle boolean status
    const [allBooleanFields, setAllBooleanFields] = useState([]);
    const handleBooleanStatus = (e, input_name) => {
        const obj = {};
        obj[input_name] = e.target.checked;

        const duplicateV = allBooleanFields?.find(dt => dt[input_name])

        if (!!duplicateV) {
            const filterObj = allBooleanFields?.filter(dt => !dt[input_name])
            setAllBooleanFields([...filterObj, obj]);

        } else {
            setAllBooleanFields(pre => [...pre, obj])
        }
    }


    // handle switch boolean status
    const [allSwitchBooleanFields, setAllSwitchBooleanFields] = useState([]);
    const handleSwitchBooleanStatus = (e, input_name) => {
        const obj = {};
        obj[input_name] = e;

        const duplicateV = allSwitchBooleanFields?.find(dt => dt[input_name])

        if (!!duplicateV) {
            const filterObj = allSwitchBooleanFields?.filter(dt => !dt[input_name])
            setAllSwitchBooleanFields([...filterObj, obj]);

        } else {
            setAllSwitchBooleanFields(pre => [...pre, obj])
        }
    }


    // submit form
    const [loadingNext, setLoadingNext] = useState(false)
    const onFinish = (values) => {
        setLoadingNext(true)

        // add all time based input into values
        timePickUpArr?.forEach(tm => values[Object.keys(tm)[0]] = Object.values(tm)[0])
        // add all date based input into values images
        datePickUpArr?.forEach(dt => values[Object.keys(dt)[0]] = Object.values(dt)[0])
        // add images input into values 
        images?.forEach(imag => values[Object.keys(imag)[0]] = Object.values(imag)[0])
        // files
        files?.forEach(fil => values[Object.keys(fil)[0]] = Object.values(fil)[0])
        // all boolean fields allSwitchBooleanFields
        allBooleanFields?.forEach(bl => values[Object.keys(bl)[0]] = Object.values(bl)[0])
        // all Switch BooleanFields
        allSwitchBooleanFields?.forEach(bl => values[Object.keys(bl)[0]] = Object.values(bl)[0])
        // digital signature
        values.digital_signature = signature;

        const token = localStorage.getItem('taxstickToken') ?? '';
        const decoded = jwt_decode(token);

        const other_info = {
            year,
            progress_number: 15,
            steps: 1,

            province_name: values.province_name,
            first_name: values.first_name,
            middle_name: values.middle_name,
            last_name: values.last_name,

            phone_number: values.phone_number,
            profile_image: values.profile_image,
            first_time_tax: values.first_time_tax,
            date_of_birth: values.date_of_birth,
            address: values.address,

            marital_status: values.marital_status,
            partner_first_name: values.partner_first_name,
            partner_last_name: values.partner_last_name,
            partner_dob: values.partner_dob,
            partner_sin: values.partner_sin,

            time_to_call_1: values.time_to_call_1,
        }

        delete values['province_name']
        delete values['first_name']
        delete values['middle_name']
        delete values['last_name']

        delete values['phone_number']
        delete values['profile_image']
        delete values['first_time_tax']
        delete values['date_of_birth']
        delete values['address']

        delete values['marital_status']
        delete values['partner_first_name']
        delete values['partner_last_name']
        delete values['partner_dob']
        delete values['partner_sin']
        delete values['time_to_call_1']

        values.other_info = other_info;

        if (year) {
            createTaxFile(values).then(info => {

                const bodyData = { steps: 1 }
                const queryValue = { userId: decoded.id };

                editUserAPI(bodyData, queryValue).then(data => {
                    setLoadingNext(false)
                    if (data?.status === true) {
                        toast.success('Your data have been updated successfully, please fill more information.')
                        setTimeout(() => {
                            router.push(`/user/submitted-tax-file/create/step2?formID=${info?.data?._id}&year=${year}`)
                        }, 3500);
                    } else {
                        toast.warning(data?.message)
                    }
                })
            })

        } else {
            message.warning('Please, Select Year First !')
            setLoadingNext(false)
        }
    };


    return (
        <section>
            <Form
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                {/* Profile image and name section */}
                <div className='md:grid md:grid-cols-2 gap-x-2 md:gap-x-10 gap-y-1 mb-3'>
                    <div>
                        {
                            formFieldsData?.map((field, i) =>
                                <>
                                    {
                                        ((field?.input_type === 'image') && (field?.input_name === 'profile_image') && checkFieldStatus(field?.input_name)) &&
                                        <InputImageUpload
                                            input_name={field?.input_name}
                                            imgTitle={field?.input_name?.split('_').join(' ').toUpperCase()}
                                            imgURL=''
                                            fileLoading={fileLoading}
                                            handleImage={handleImage}
                                            images={images}
                                            requiredOption={field?.field_required}
                                        />
                                    }
                                </>
                            )
                        }
                    </div>
                    <div>
                        {
                            formFieldsData?.map((field, i) =>
                                <div key={i + 7777}>
                                    {
                                        ((field?.input_type === 'text') && (field?.input_name === 'first_name' || field?.input_name === 'middle_name' || field?.input_name === 'last_name') && checkFieldStatus(field?.input_name)) &&
                                        <FormInput
                                            label={field?.input_name?.split('_').join(' ').toUpperCase()}
                                            formName={field?.input_name}
                                            formPlaceholder={capitalizeFirstLetter(field?.input_name?.split('_').join(' '))}
                                            formMessage={field?.input_name?.split('_').join(' ')}
                                            formRequired={false}
                                            requiredOption={field?.field_required}
                                        />
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>


                {/* common form field row 1 */}
                <div className='md:grid md:grid-cols-2 gap-x-2 md:gap-x-10 gap-y-1 mb-3'>
                    <div>
                        {
                            formFieldsData?.map((field, i) =>
                                <>
                                    {
                                        ((field?.input_type === 'date') && (field?.input_name === 'date_of_birth') && checkFieldStatus(field?.input_name)) &&
                                        <FormDateInput
                                            label={field?.input_name?.split('_').join(' ').toUpperCase()}
                                            formName={field?.input_name} formPlaceholder={capitalizeFirstLetter(field?.input_name?.split('_').join(' '))}
                                            formMessage={field?.input_name?.split('_').join(' ')}
                                            formRequired={false}
                                            handleDatePickUp={handleDatePickUp}
                                            handleDateField={handleDateField}
                                            requiredOption={field?.field_required}
                                        />
                                    }
                                </>
                            )
                        }
                    </div>
                    <div>
                        {
                            formFieldsData?.map((field, i) =>
                                <div key={i + 77224}>
                                    {
                                        ((field?.input_type === 'select') && (field?.input_name === "marital_status") && checkFieldStatus(field?.input_name)) &&
                                        <FormInputSelect
                                            label={field?.input_name?.split('_').join(' ').toUpperCase()}
                                            formName={field?.input_name}
                                            formPlaceholder={capitalizeFirstLetter(field?.input_name?.split('_').join(' '))}
                                            formMessage={field?.input_name?.split('_').join(' ')}
                                            formRequired={false}
                                            select_options={field?.select_options}
                                            provinceData={provinceData}
                                            requiredOption={field?.field_required}
                                            setMaritalStatus={setMaritalStatus}
                                        />
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>

                {/* common form field row 2 */}
                <div className='md:grid md:grid-cols-2 gap-x-2 md:gap-x-10 gap-y-1'>
                    {
                        formFieldsData?.map(field =>
                            <>
                                {
                                    ((field?.input_type === 'text') && (maritalStatus === 'married') &&
                                        (
                                            (field?.input_name === "partner_first_name") ||
                                            (field?.input_name === "partner_last_name") ||
                                            (field?.input_name === "partner_sin")
                                        ) &&
                                        checkFieldStatus(field?.input_name)) &&
                                    <FormInput
                                        label={field?.input_name?.split('_').join(' ').toUpperCase()}
                                        formName={field?.input_name}
                                        formPlaceholder={capitalizeFirstLetter(field?.input_name?.split('_').join(' '))}
                                        formMessage={field?.input_name?.split('_').join(' ')}
                                        formRequired={false}
                                        requiredOption={field?.field_required}
                                    />
                                }

                                {
                                    ((field?.input_type === 'date') && (maritalStatus === 'married') && (field?.input_name === "partner_dob") && checkFieldStatus(field?.input_name)) &&
                                    <FormDateInput
                                        label={field?.input_name?.split('_').join(' ').toUpperCase()}
                                        formName={field?.input_name} formPlaceholder={capitalizeFirstLetter(field?.input_name?.split('_').join(' '))}
                                        formMessage={field?.input_name?.split('_').join(' ')}
                                        formRequired={false}
                                        handleDatePickUp={handleDatePickUp}
                                        handleDateField={handleDateField}
                                        requiredOption={field?.field_required}
                                    />
                                }
                            </>
                        )
                    }
                </div>


                {/* dynamic form fields sorting stage 1 */}
                <div className='md:grid md:grid-cols-2 gap-x-2 md:gap-x-10 gap-y-1'>
                    {
                        formFieldsData?.map(field =>
                            <>
                                {
                                    (
                                        (field?.input_type === 'text') &&
                                        (field?.input_name !== "partner_first_name") &&
                                        (field?.input_name !== "partner_last_name") &&
                                        (field?.input_name !== "partner_sin") &&
                                        (field?.input_name !== 'first_name') &&
                                        (field?.input_name !== 'middle_name') &&
                                        (field?.input_name !== 'last_name') &&
                                        checkFieldStatus(field?.input_name)) &&
                                    <FormInput
                                        label={field?.input_name?.split('_').join(' ').toUpperCase()}
                                        formName={field?.input_name}
                                        formPlaceholder={capitalizeFirstLetter(field?.input_name?.split('_').join(' '))}
                                        formMessage={field?.input_name?.split('_').join(' ')}
                                        formRequired={false}
                                        requiredOption={field?.field_required}
                                    />
                                }

                                {
                                    ((field?.input_type === 'boolean' || field?.input_type === 'switch') && checkFieldStatus(field?.input_name)) &&
                                    <FormSwitch
                                        label={field?.input_name?.split('_').join(' ').toUpperCase()}
                                        formName={field?.input_name}
                                        formPlaceholder={capitalizeFirstLetter(field?.input_name?.split('_').join(' '))}
                                        handleSwitchBooleanStatus={handleSwitchBooleanStatus}
                                        requiredOption={field?.field_required}

                                    />
                                }

                                {
                                    (field?.input_type === 'number' && checkFieldStatus(field?.input_name)) &&
                                    <FormNumber
                                        label={field?.input_name?.split('_').join(' ').toUpperCase()}
                                        formName={field?.input_name} formPlaceholder={capitalizeFirstLetter(field?.input_name?.split('_').join(' '))}
                                        formMessage={field?.input_name?.split('_').join(' ')}
                                        formRequired={false}
                                        requiredOption={field?.field_required}
                                    />
                                }

                                {
                                    (
                                        (field?.input_type === 'date') &&
                                        (field?.input_name !== 'date_of_birth') &&
                                        (field?.input_name !== 'partner_dob') &&
                                        checkFieldStatus(field?.input_name)) &&
                                    <FormDateInput
                                        label={field?.input_name?.split('_').join(' ').toUpperCase()}
                                        formName={field?.input_name} formPlaceholder={capitalizeFirstLetter(field?.input_name?.split('_').join(' '))}
                                        formMessage={field?.input_name?.split('_').join(' ')}
                                        formRequired={false}
                                        handleDatePickUp={handleDatePickUp}
                                        handleDateField={handleDateField}
                                        requiredOption={field?.field_required}
                                    />
                                }

                                {
                                    (field?.input_type === 'time' && checkFieldStatus(field?.input_name)) &&
                                    <FormTimeInput
                                        label={field?.input_name?.split('_').join(' ').toUpperCase()}
                                        formName={field?.input_name} formPlaceholder={capitalizeFirstLetter(field?.input_name?.split('_').join(' '))}
                                        formMessage={field?.input_name?.split('_').join(' ')}
                                        formRequired={false}
                                        handleTimePickUp={handleTimePickUp}
                                        handleTimeField={handleTimeField}
                                        requiredOption={field?.field_required}
                                    />
                                }

                                {
                                    ((field?.input_type === 'select') &&
                                        ((field?.input_name !== "marital_status")) &&
                                        checkFieldStatus(field?.input_name)) &&
                                    <FormInputSelect
                                        label={field?.input_name?.split('_').join(' ').toUpperCase()}
                                        formName={field?.input_name}
                                        formPlaceholder={capitalizeFirstLetter(field?.input_name?.split('_').join(' '))}
                                        formMessage={field?.input_name?.split('_').join(' ')}
                                        formRequired={false}
                                        select_options={field?.select_options}
                                        provinceData={provinceData}
                                        requiredOption={field?.field_required}
                                    />
                                }

                                {
                                    (field?.input_type === 'radio_button' && checkFieldStatus(field?.input_name)) &&
                                    <FormInputRadioButton
                                        label={field?.input_name?.split('_').join(' ').toUpperCase()}
                                        input_name={field?.input_name}
                                        formPlaceholder={capitalizeFirstLetter(field?.input_name?.split('_').join(' '))}
                                        select_options={field?.select_options}
                                        requiredOption={field?.field_required}
                                    />
                                }

                                {
                                    (field?.input_type === 'file' && checkFieldStatus(field?.input_name)) &&
                                    <InputFileUpload
                                        input_name={field?.input_name}
                                        fileTitle={field?.input_name?.split('_').join(' ').toUpperCase()}
                                        imgURL=''
                                        fileLoading={fileLoading}
                                        handleFile={handleFile}
                                        files={files}
                                        requiredOption={field?.field_required}
                                    />
                                }
                            </>
                        )
                    }
                </div>

                {/* dynamic form fields sorting stage 2 */}
                <div className='md:grid md:grid-cols-2'>
                    {
                        formFieldsData?.map(field =>
                            <>
                                {
                                    ((field?.input_type === 'image') && (field?.input_name !== 'profile_image') && checkFieldStatus(field?.input_name)) &&
                                    <InputImageUpload
                                        input_name={field?.input_name}
                                        imgTitle={field?.input_name?.split('_').join(' ').toUpperCase()}
                                        imgURL=''
                                        fileLoading={fileLoading}
                                        handleImage={handleImage}
                                        images={images}
                                        requiredOption={field?.field_required}
                                    />
                                }
                            </>
                        )
                    }
                </div>

                {/* dynamic form fields sorting stage 3 */}
                <div className='mt-3'>
                    {
                        formFieldsData?.map(field =>
                            <>
                                {
                                    (field?.input_type === 'textarea' && checkFieldStatus(field?.input_name)) &&
                                    <FormTextArea
                                        label={field?.input_name?.split('_').join(' ').toUpperCase()}
                                        formName={field?.input_name} formPlaceholder={capitalizeFirstLetter(field?.input_name?.split('_').join(' '))}
                                        formMessage={field?.input_name?.split('_').join(' ')}
                                        formRequired={false}
                                        requiredOption={field?.field_required}
                                    />
                                }
                            </>
                        )
                    }
                </div>

                {/* dynamic form fields sorting stage 4 */}
                <div className='mt-3'>
                    {
                        formFieldsData?.map(field =>
                            <>
                                {
                                    (field?.input_type === 'digital_signature' && checkFieldStatus(field?.input_name)) &&
                                    <DigitalSignature
                                        handleDigitalSignatureData={handleDigitalSignatureData} handleDigitalSignatureClear={handleDigitalSignatureClear}
                                        digitalSignatureRef={digitalSignatureRef}
                                        requiredOption={field?.field_required}
                                    />
                                }
                            </>
                        )
                    }
                </div>

                {/* dynamic form fields sorting stage 5 */}
                <div className='md:grid md:grid-cols-2 gap-x-2 md:gap-x-10 gap-y-1'>
                    {
                        formFieldsData?.map(field =>
                            <>
                                {
                                    (field?.input_type === 'checkbox' && checkFieldStatus(field?.input_name)) &&
                                    <InputCheckbox
                                        label={field?.input_name?.split('_').join(' ').toUpperCase()}
                                        input_name={field?.input_name}
                                        formName={field?.input_name}
                                        formPlaceholder={capitalizeFirstLetter(field?.input_name?.split('_').join(' '))}
                                        handleBooleanStatus={handleBooleanStatus}
                                        checkLink={field?.link}
                                        requiredOption={field?.field_required}
                                    />
                                }
                            </>
                        )
                    }
                </div>


                {/* submit button */}
                <div className='flex justify-end gap-2 mt-5'>

                    <button className='btn btn-danger'>SAVE AND NEXT</button>
                    <span onClick={handleFormCancel} className='btn btn-info text-light'>CANCEL</span>

                </div>

                {
                    loadingNext &&
                    <div className="flex justify-center">
                        <ScaleLoader color="purple" size={30} />
                    </div>
                }
            </Form>

            {/* toast message */}
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </section>
    );
};

export default TaxFileForm1;