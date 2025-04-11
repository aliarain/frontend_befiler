import React from 'react';

const ServiceAndWayModalViewDetails = ({ isModalData = {} }) => {
    const { image, title, description, deatils, logo } = isModalData


    return (
        <div>
            <div>
                <a href={(image || logo) ?? '##'} target='__blank'>
                    <img src={(image || logo) ?? '/images/default-avatar.png'} alt="Logo/image" className='w-auto h-32 cursor-zoom-in' />
                </a>
                <p className='mt-2 border-t pt-2 text-justify font-semibold'>{title ?? 'N/A'}</p>
                <p className='mt-2 border-t pt-2 text-justify'>{(description || deatils) ?? 'N/A'}</p>
            </div>
        </div>
    );
};

export default ServiceAndWayModalViewDetails;