import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Select, Checkbox, Spin } from 'antd';
const { Option } = Select;
import { AWSFileUploadAPI, editUserAPI, updateTaxFile } from '../../../helpers/backend_helper';
import { toast, ToastContainer } from 'react-toastify';
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

function capitalizeFirstLetter(string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
}


// user form fill up -> step 2
const TaxFileForm2 = ({ year, formID, checkFieldStatus, formFieldsData = [] }) => {
    const [form] = Form.useForm();
    const digitalSignatureRef = useRef();
    const [signature, setSignature] = useState(null);
    const [refreshState, setRefreshState] = useState(null);

    const router = useRouter()

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
            toast.warning("The file must be an image & <= 3MB!")
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
            toast.warning("Maximum size is 5 MB! Valid files are image, csv, pdf, excel, zip, rar")
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
    // input on chancge value
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
    // input on focus value
    const handleTimeField = (fieldName) => {
        setTimePickUpName(fieldName)
    }


    // Date handling and managing
    const [datePickUpName, setDatePickUpName] = useState('');
    const [datePickUpArr, setDatePickUpArr] = useState([]);
    // input on chancge value
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


    // back to the previous page
    const handleBackPage = () => {
        router.push(`/user/submitted-tax-file/create/step1?year=${year}`)
    }

    // update user inforamtion
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
        // all boolean fields
        allBooleanFields?.forEach(bl => values[Object.keys(bl)[0]] = Object.values(bl)[0])
        // all Switch BooleanFields
        allSwitchBooleanFields?.forEach(bl => values[Object.keys(bl)[0]] = Object.values(bl)[0])
        // digital signature
        values.digital_signature = signature;

        const token = localStorage.getItem('taxstickToken') ?? '';
        const decoded = jwt_decode(token);

        let other_info = {
            year,
            progress_number: 25,
            steps: 2,
            form_fill_up: 'done',
            terms_and_conditions: values.terms_and_conditions,
            time_to_call_1: values.time_to_receive_a_call
        }

        if (values?.province_name) {
            other_info.province_name = values?.province_name
            delete values['province_name']
        }
        delete values['terms_and_conditions']
        delete values['time_to_receive_a_call']

        values.other_info = other_info;

        if (signature === null && (checkFieldStatus('digital_signature') === true)) {
            toast.error('Signature required!', {
                position: "top-right", autoClose: 3000, hideProgressBar: false,
                closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
            })
        }

        if (!year) {
            toast.error('year required!', {
                position: "top-right", autoClose: 3000, hideProgressBar: false,
                closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
            })
        }

        if (!formID) {
            toast.error('form ID required!', {
                position: "top-right", autoClose: 3000, hideProgressBar: false,
                closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
            })
        }


        if (formID && year && (checkFieldStatus('digital_signature') === false ? true : signature) && (values.other_info.terms_and_conditions)) {
            const queryValue = { id: formID }
            updateTaxFile(values, queryValue).then(info => {

                const bodyData = { steps: 2 }
                const queryValue = { userId: decoded.id };

                editUserAPI(bodyData, queryValue).then(data => {
                    setLoadingNext(false)
                    if (data?.status === true) {
                        toast.success('Information updated successfully, complete the process by payment')
                        setTimeout(() => {
                            router.push(`/user/submitted-tax-file/create/step3-payment?formID=${info?.data?._id}`)
                        }, 3500);

                    } else {
                        toast.error(data?.message)
                    }
                })
            })

        } else {
            setLoadingNext(false)
            toast.error('Invalid Input! Please check again...', {
                position: "top-right", autoClose: 3000, hideProgressBar: false,
                closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
            })
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
                {/* dynamic form's field generation, sorting stage 1 */}
                <div className='md:grid md:grid-cols-2 gap-x-2 md:gap-x-10 gap-y-1'>
                    {
                        formFieldsData?.map(field =>
                            <>
                                {
                                    (field?.input_type === 'text' && checkFieldStatus(field?.input_name)) &&
                                    <FormInput
                                        label={field?.input_name?.split('_').join(' ').toUpperCase()}
                                        formName={field?.input_name}
                                        formPlaceholder={capitalizeFirstLetter(field?.input_name?.split('_').join(' '))}
                                        formMessage={field?.input_name?.split('_').join(' ')}
                                        formRequired={false}
                                    />
                                }

                                {
                                    ((field?.input_type === 'boolean' || field?.input_type === 'switch') && checkFieldStatus(field?.input_name)) &&
                                    <FormSwitch
                                        label={field?.input_name?.split('_').join(' ').toUpperCase()}
                                        formName={field?.input_name}
                                        formPlaceholder={capitalizeFirstLetter(field?.input_name?.split('_').join(' '))}
                                        handleSwitchBooleanStatus={handleSwitchBooleanStatus}
                                    />
                                }

                                {
                                    (field?.input_type === 'number' && checkFieldStatus(field?.input_name)) &&
                                    <FormNumber
                                        label={field?.input_name?.split('_').join(' ').toUpperCase()}
                                        formName={field?.input_name} formPlaceholder={capitalizeFirstLetter(field?.input_name?.split('_').join(' '))}
                                        formMessage={field?.input_name?.split('_').join(' ')}
                                        formRequired={false}
                                    />
                                }

                                {
                                    (field?.input_type === 'date' && checkFieldStatus(field?.input_name)) &&
                                    <FormDateInput
                                        label={field?.input_name?.split('_').join(' ').toUpperCase()}
                                        formName={field?.input_name} formPlaceholder={capitalizeFirstLetter(field?.input_name?.split('_').join(' '))}
                                        formMessage={field?.input_name?.split('_').join(' ')}
                                        formRequired={false}
                                        handleDatePickUp={handleDatePickUp}
                                        handleDateField={handleDateField}
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
                                    />
                                }

                                {
                                    (field?.input_type === 'select' && checkFieldStatus(field?.input_name)) &&
                                    <FormInputSelect
                                        label={field?.input_name?.split('_').join(' ').toUpperCase()}
                                        formName={field?.input_name}
                                        formPlaceholder={capitalizeFirstLetter(field?.input_name?.split('_').join(' '))}
                                        formMessage={field?.input_name?.split('_').join(' ')}
                                        formRequired={false}
                                        select_options={field?.select_options}
                                        provinceData={provinceData}
                                    />
                                }

                                {
                                    // try more
                                    (field?.input_type === 'radio_button' && checkFieldStatus(field?.input_name)) &&
                                    <FormInputRadioButton
                                        label={field?.input_name?.split('_').join(' ').toUpperCase()}
                                        input_name={field?.input_name}
                                        formPlaceholder={capitalizeFirstLetter(field?.input_name?.split('_').join(' '))}
                                        select_options={field?.select_options}
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
                                    />
                                }
                            </>
                        )
                    }
                </div>

                {/* dynamic form's field generation, sorting stage 2 */}
                <div className='md:grid md:grid-cols-2'>
                    {
                        formFieldsData?.map(field =>
                            <>
                                {
                                    (field?.input_type === 'image' && checkFieldStatus(field?.input_name)) &&
                                    <InputImageUpload
                                        input_name={field?.input_name}
                                        imgTitle={field?.input_name?.split('_').join(' ').toUpperCase()}
                                        imgURL=''
                                        fileLoading={fileLoading}
                                        handleImage={handleImage}
                                        images={images}
                                    />
                                }
                            </>
                        )
                    }
                </div>

                {/* dynamic form's field generation, sorting stage 3 */}
                <div className=''>
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
                                    />
                                }
                            </>
                        )
                    }
                </div>

                {/* dynamic form's field generation, sorting stage 4 */}
                <div className='mt-3'>
                    {
                        formFieldsData?.map(field =>
                            <>
                                {
                                    (field?.input_type === 'digital_signature' && checkFieldStatus(field?.input_name)) &&
                                    <DigitalSignature
                                        handleDigitalSignatureData={handleDigitalSignatureData} handleDigitalSignatureClear={handleDigitalSignatureClear}
                                        digitalSignatureRef={digitalSignatureRef}
                                    />
                                }
                            </>
                        )
                    }
                </div>

                {/* dynamic form's field generation, sorting stage 5 */}
                <div className='md:grid md:grid-cols-2 gap-x-2 md:gap-x-10 gap-y-1'>
                    {
                        formFieldsData?.map(field =>
                            <>
                                {
                                    (field?.input_type === 'checkbox' && (field?.input_name !== "terms_and_conditions") && checkFieldStatus(field?.input_name)) &&
                                    <InputCheckbox
                                        label={field?.input_name?.split('_').join(' ').toUpperCase()}
                                        input_name={field?.input_name}
                                        formName={field?.input_name}
                                        formPlaceholder={capitalizeFirstLetter(field?.input_name?.split('_').join(' '))}
                                        handleBooleanStatus={handleBooleanStatus}
                                        checkLink={field?.link}
                                    />
                                }
                            </>
                        )
                    }
                </div>

                {/* term and condition */}
                <div className='mt-5'>
                    {
                        formFieldsData?.map(field =>
                            <>
                                {
                                    (field?.input_type === 'checkbox' && (field?.input_name === "terms_and_conditions")) &&
                                    <div>
                                        <Form.Item
                                            name="terms_and_conditions"
                                            valuePropName="checked"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please accept terms and conditions',
                                                },
                                            ]}
                                        >
                                            <Checkbox>I accept the <a href={field?.link ?? '#'} target="__blank" className='text-purple-500'>Terms and Conditions</a></Checkbox>
                                        </Form.Item>
                                    </div>
                                }
                            </>
                        )
                    }
                </div>


                {/* submit button */}
                <div className='flex justify-end gap-2 mt-4'>

                    <button className='btn btn-danger'>SAVE &amp; FINISH</button>
                    <span onClick={handleBackPage} className='btn btn-info text-light'>BACK</span>

                </div>

                {
                    loadingNext &&
                    <div className="flex justify-center">
                        <Spin />
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
        </section >
    );
};

export default TaxFileForm2;