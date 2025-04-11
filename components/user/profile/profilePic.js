import React, { useState } from 'react';
import { Form } from "antd";
import { toast, ToastContainer } from 'react-toastify';
import { AWSFileUploadAPI, editUserAPI } from '../../../helpers/backend_helper';


const ProfilePic = ({ user, setRefreshData }) => {
    const [profileImg, setProfileImg] = useState();

    // upload image to the 3rd party storage and get url
    const handleImage = async (e) => {
        const data = new FormData()
        data.append('file', e.target.files[0])

        AWSFileUploadAPI(data).then(url => {
            if (url?.url) {
                setProfileImg(url?.url)

            }
        });
    }

    const onFinish = (values) => {
        values.profile_img = profileImg;
        if (profileImg) {
            const queryValue = { userId: user?._id }
            editUserAPI(values, queryValue).then(data => {
                if (data?.status) {
                    toast.success("Profile image updated successfully!");
                    setRefreshData(data?.data)
                } else {
                    toast.error(data?.message);
                }
            })

        } else {
            toast.warning('Please try again, server is busy now!')
        }
    }


    return (
        <div>
            <p className='text-lg'> <span className='bg-green-500 text-white px-2 py-1 rounded-md font-mono'>Active</span> </p>
            <p className='text-lg'>Update picture</p>
            <div className=' w-56 mx-auto'>
                <img className='h-56 w-56  shadow' style={{ objectFit: 'cover', objectPosition: '50% 0%' }} src={user?.profile_img ? `${user?.profile_img}` : '/images/default-avatar.png'} alt="profile-image" />
            </div>
            <div className='flex justify-center py-4'>
                <Form
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item name="profile_img">
                        <input
                            type="file"
                            className="text-base border"
                            accept="image/*"
                            onChange={handleImage}
                        />
                    </Form.Item>
                    <Form.Item>
                        {
                            !!profileImg &&
                            <button type="submit"
                                    className='bg-[#F33527] hover:bg-[#DF2F25] text-white px-6 py-2 rounded'>
                                Update Profile
                            </button>
                        }
                    </Form.Item>
                </Form>
            </div>
            {/* alert */}
            <ToastContainer
                position="bottom-center"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default ProfilePic;