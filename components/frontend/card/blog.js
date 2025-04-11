import React from 'react';

const Blog = ({  data }) => {
    return (
        <div className='flex justify-center items-center hero_font_family '>
            <p className='text-[16px] text-justify mb-0'>{data?.description}</p>
        </div>
    );
};

export default Blog;