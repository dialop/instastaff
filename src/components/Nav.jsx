// - NAV PAGE - //

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { GiHamburger } from "react-icons/gi";
import { useAuth0 } from '@auth0/auth0-react';

import LoginButton from './LoginButton';
import SignUpButton from './SignUpButton';


const Navbar = ({ isAdmin }) => {
  const [nav, setNav] = useState(false);
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const { isAuthenticated, user } = useAuth0();


  useEffect(() => {
    if (isAuthenticated) {
      setUserData(user); 
      console.log('from nav', userData);
    }
  }, [isAuthenticated, user]);
  


  const handleNav = () => {
    setNav(!nav);
  };
  

  const isActive = (pathname) => location.pathname === pathname;

  return (
    <div className='flex justify-between items-center h-24 mx-auto px-20 text-black bg-[#B8E4FF] drop-shadow-md'>
      <h1 className='w-full text-3xl font-bold text-[#24233E]'>
        <Link to="/">InstaStaff</Link> 
      </h1>
      <ul className='hidden md:flex items-center'>
      {userData && userData.is_admin && ( 

          <>
      <li className={`p-4 ${isActive('/post-jobs') ? 'border-t-4 border-[#24233E]' : ''}`}>
          <Link to="/post-shift">Post New Job</Link>
        </li>
        <li className={`p-4 ${isActive('/jobs') ? 'border-t-2 border-[#24233E]' : ''}`}>
          <Link to="/jobs">Jobs</Link>
        </li>
        <LoginButton />
        </>
        )}
              <li className={`p-4 ${isActive('/jobs') ? 'border-t-2 border-[#24233E]' : ''}`}>
          <Link to="/jobs">Jobs</Link>
        </li>
        <li className={`p-4 ${isActive('/calendar') ? 'border-t-2 border-[#24233E]' : ''}`}>
          <Link to="/calendar">Calendar</Link>
        </li>
        <li className={`p-4 ${isActive('/maps') ? 'border-t-2 border-[#24233E]' : ''}`}>
          <Link to="/maps">Map</Link>
        </li>
        <li className={`p-4 ${isActive('/profile') ? 'border-t-2 border-[#24233E]' : ''}`}>
          <Link to="/profile">Profile</Link>
        </li>
        <p className='flex w-16 justify-center'> | </p>
        <SignUpButton />
        <LoginButton />
      </ul>
      <div onClick={handleNav} className='block md:hidden z-10'>
        {nav ? <IoMdClose size={30}/> : <GiHamburger size={30}/>}
      </div>
      <ul className={nav ? 'fixed left-0 top-0 w-full h-full bg-[#6547A5] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <li className='p-6'><Link to="/jobs" className='flex justify-center items-center text-2xl' onClick={handleNav}>Jobs</Link></li>
        <li className='p-6'><Link to="/calendar" className='flex justify-center items-center text-2xl' onClick={handleNav}>Calendar</Link></li>
        <li className='p-6'><Link to="/maps" className='flex justify-center items-center text-2xl' onClick={handleNav}>Maps</Link></li>
        <li className='p-6'><Link to="/profile" className='flex justify-center items-center text-2xl' onClick={handleNav}>Profile</Link></li>
        <div className='flex flex-col items-center'>
          <button className='bg-transparent hover:bg-[#7D67AC] hover:text-white py-2 px-4 mb-4 border border-[#5b588a] hover:border-transparent rounded'>Register</button>
          <button className='bg-[#6547A5] hover:bg-[#7D67AC] text-white py-2.5 px-4 border-[#24233E] hover:border-transparent rounded'>Login</button>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;