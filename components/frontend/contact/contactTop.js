import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Menu from '../menu/menu';


const ContactTop = ({ contactContent }) => {
    const router = useRouter();


    return (
        <div className='mega-menu bg-[url("/codecayonImage/bg3.png")] bg-cover bg-center '>
            <div className=' lg:h-16 shadow bg-white'>
                {/* main menu with sidebar */}
                <Menu />
            </div>
            {/* contact header data */}
            <div className='relative  second_header flex justify-center items-center'>
                <div className='container'>
                    <h1 className='text-center text-[34px] font-extrabold hero_font_family text-white'>Contact us</h1>
                    <p className='text-[18px] text-center '>
                        <span className='cursor-pointer'>
                            <Link href="/"><a className={router.pathname === "/" ? " text-[#14AA40]" : "text-white"}>Home</a></Link>
                        </span>
                        <span className='text-white'> / </span>
                        <span className='cursor-pointer'>
                            <Link href="/home/contact"><a className={router.pathname == "/home/contact" ? "text-[#14AA40]" : "text-white"}>Contact us</a></Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactTop;