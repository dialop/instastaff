// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { IoMdClose } from "react-icons/io";
import { GiHamburger } from "react-icons/gi";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='flex justify-between items-center h-24 mx-auto px-20 text-black bg-[#B8E4FF] drop-shadow-md'>
      <h1 className='w-full text-3xl font-bold text-[#24233E]'>
        <Link to="/">InstaStaff</Link> {/* Make the title clickable */}
      </h1>
      <ul className='hidden md:flex items-center'>
        <li className='p-4'>
          <Link to="/jobs">Jobs</Link> {/* Make the Jobs item clickable */}
        </li>
        <li className='p-4'>
          <Link to="/calendar">Calendar</Link> {/* Make the Calendar item clickable */}
        </li>
        <li className='p-4'>
          <Link to="/maps">Maps</Link> {/* Make the Maps item clickable */}
        </li>
        <li className='p-4'>
          <Link to="/profile">Profile</Link> {/* Make the Profile item clickable */}
        </li>
        <p className='flex w-16 justify-center'> | </p>
        <button className='bg-transparent hover:bg-[#7D67AC] hover:text-white py-2 px-4 mr-2 border border-[#5b588a] hover:border-transparent rounded'>Register</button>
        <button className='bg-[#6547A5] hover:bg-[#7D67AC] text-white py-2.5 px-4 border-[#24233E] hover:border-transparent rounded'> Login </button>
      </ul>
      <div onClick={handleNav} className='block md:hidden z-10'>
        {nav ? <IoMdClose size={30}/> : <GiHamburger  size={30}/>}
      </div>
      <ul className={nav ? 'fixed left-0 top-0 w-full h-full bg-[#6547A5] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        {/* Responsive menu items */}
        <li className='p-6'>
          <Link to="/jobs" className='flex justify-center items-center text-2xl' onClick={handleNav}>Jobs</Link>
        </li>
        <li className='p-6'>
          <Link to="/calendar" className='flex justify-center items-center text-2xl' onClick={handleNav}>Calendar</Link>
        </li>
        <li className='p-6'>
          <Link to="/maps" className='flex justify-center items-center text-2xl' onClick={handleNav}>Maps</Link>
        </li>
        <li className='p-6'>
          <Link to="/profile" className='flex justify-center items-center text-2xl' onClick={handleNav}>Profile</Link>
        </li>
        <div className='flex flex-col items-center'>
          <button className='bg-transparent hover:bg-[#7D67AC] hover:text-white py-2 px-4 mb-4 border border-[#5b588a] hover:border-transparent rounded'>Register</button>
          <button className='bg-[#6547A5] hover:bg-[#7D67AC] text-white py-2.5 px-4 border-[#24233E] hover:border-transparent rounded'> Login </button>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
