import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiHamburger } from "react-icons/gi";

import LoginButton from './LoginButton';
import SignUpButton from './SignUpButton';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='flex justify-between items-center h-24 mx-auto px-20 text-black bg-[#B8E4FF] drop-shadow-md'>
      <h1 className='w-full text-3xl font-bold text-[#24233E]'><a href="/">InstaStaff</a></h1>
      <ul className='hidden md:flex items-center'>
        <li className='p-4'><a href="/jobs">Jobs</a></li>
        <li className='p-4'>Calendar</li>
        <li className='p-4'>Map</li>
        <li className='p-4'>Profile</li>
        <p className='flex w-16 justify-center'> | </p>
        <SignUpButton />
        <LoginButton />
      </ul>
      <div onClick={handleNav} className='block md:hidden z-10'>
          {nav ? <IoMdClose size={30}/> : <GiHamburger  size={30}/>}
      </div>
      <ul className={nav ? 'fixed left-0 top-0 w-full h-full bg-[#6547A5] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <h1 className='flex justify-center items-center w-full text-3xl font-bold mt-8 mb-8'>InstaStaff</h1>
          <li className='p-6 flex justify-center items-center text-2xl border-b border-gray-100'>Jobs</li>
          <li className='p-6 flex justify-center items-center text-2xl border-b border-gray-100'>Calendar</li>
          <li className='p-6 flex justify-center items-center text-2xl border-b border-gray-100'>Maps</li>
          <li className='p-6 flex justify-center items-center text-2xl border-b border-gray-100'>Profile</li>
      </ul>
    </div>
  );
};

export default Navbar;