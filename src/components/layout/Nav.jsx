import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { GiHamburger } from "react-icons/gi";
import { useAuth0 } from '@auth0/auth0-react';
import { useAdmin } from '../../context/AdminContext'; // Import useAdmin
import logo from '../../assets/instastaff_transparent-logo.png';
import Switch from '@mui/material/Switch';

import LoginButton from '../user/LoginButton';
import SignUpButton from '../user/SignUpButton';
import ProfileAvatar from '../user/ProfileAvatar';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth0();
  const { isAdmin, setAdmin } = useAdmin(); // Use the admin context

  const handleNav = () => {
    setNav(!nav);
  };

  const handleToggleAdminView = () => {
    setAdmin(!isAdmin); // Toggle admin view using context
  };

  const isActive = (pathname) => location.pathname === pathname;

  return (
    <div className='flex justify-between items-center h-24 mx-auto px-20 text-black bg-[#B8E4FF] drop-shadow-md'>
      <Link to="/">
        <div className='flex items-center h-full'>
          <img src={logo} alt="InstaStaff Logo" className='h-20' />
          <h1 className='text-3xl font-bold text-[#24233E]' style={{ lineHeight: 'inherit' }}>InstaStaff</h1>
        </div>
      </Link>
      <ul className='hidden md:flex items-center'>
        {isAuthenticated && (
          <>
            {isAdmin ? (
              <>
                <li className={`p-4 ${isActive('/post-jobs') ? 'border-t-4 border-[#24233E]' : ''}`}>
                  <Link to="/post-shift">Post New Job</Link>
                </li>
                <li className={`p-4 ${isActive('/jobs') ? 'border-t-2 border-[#24233E]' : ''}`}>
                  <Link to="/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
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
              </>
            )}
          </>
        )}
        <p className='flex w-16 justify-center'> | </p>
        {isAuthenticated && (
          <div className="flex items-center">
            <Switch checked={isAdmin} onChange={handleToggleAdminView} />
          </div>
        )}
        {isAuthenticated && !isAdmin && <li className="mr-4"><ProfileAvatar /></li>}
        <SignUpButton />
        <LoginButton />
      </ul>
      <div onClick={handleNav} className='block md:hidden z-10'>
        {nav ? <IoMdClose size={30} /> : <GiHamburger size={30} />}
      </div>
    </div>
  );
};

export default Navbar;
