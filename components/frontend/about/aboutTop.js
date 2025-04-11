import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Menu from '../menu/menu';


const AboutTop = ({ aboutContent }) => {
    const router = useRouter();

    return (
        <div className=''>
            {/* compnay address top header part */}
            <div className='lg:h-16 shadow z-20 bg-white'>
                {/* main menu with sidebar */}
                <Menu />
            </div>
            {/* about page header data */}
            <div className='relative  second_header flex justify-center items-center'>
                <div className='container'>
                    <h1 className='text-center text-[34px] font-extrabold hero_font_family text-white'>About us</h1>
                    <p className='text-[18px] text-center '>
                        <span className='cursor-pointer'>
                            <Link href="/"><a className={router.pathname === "/" ? " text-[#14AA40]" : "text-white"}>Home</a></Link>
                        </span>
                        <span className='text-white'> / </span>
                        <span className='cursor-pointer'>
                        <Link href="/home/about"><a className={router.pathname == "/home/about" ? "text-[#14AA40]" : "text-white"}>About us</a></Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutTop;