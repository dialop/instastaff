import React from 'react';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <div className="bg-[#B8E4FF] flex justify-center">
      <div className="w-full container flex flex-col justify-between py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="col-span-1 lg:col-span-1">
            <h6 className="text-lg font-semibold mb-2">InstaStaff</h6>
            <p>
            Our aim is to streamline labor and work exchanges in the medical field by offering logistical and operational support to healthcare professionals and providers.            </p>
            <div className="flex mt-4">
              <a href="#!" className="text-gray-900 mr-2">
                <Facebook />
              </a>
              <a href="#!" className="text-gray-900 mr-2">
                <Twitter />
              </a>
              <a href="#!" className="text-gray-900">
                <Instagram />
              </a>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-1">
            <h6 className="text-lg font-semibold mb-4">About</h6>
            <ul>
              <li><a href="#!" className="text-gray-900 hover:underline">How it works</a></li>
              <li><a href="#!" className="text-gray-900 hover:underline">Featured</a></li>
              <li><a href="#!" className="text-gray-900 hover:underline">Partnership</a></li>
              <li><a href="#!" className="text-gray-900 hover:underline">Business Relation</a></li>
            </ul>
          </div>
          <div className="col-span-1 lg:col-span-1"> 
            <h6 className="text-lg font-semibold mb-4">Community</h6>
            <ul>
              <li><a href="#!" className="text-gray-900 hover:underline">Events</a></li>
              <li><a href="#!" className="text-gray-900 hover:underline">Blog</a></li>
              <li><a href="#!" className="text-gray-900 hover:underline">Podcast</a></li>
              <li><a href="#!" className="text-gray-900 hover:underline">Invite a friend</a></li>
            </ul>
          </div> 
          <div className="col-span-1 lg:col-span-1"> 
            <h6 className="text-lg font-semibold mb-4">Socials</h6>
            <ul>
              <li><a href="#!" className="text-gray-900 hover:underline">Discord</a></li>
              <li><a href="#!" className="text-gray-900 hover:underline">Instagram</a></li>
              <li><a href="#!" className="text-gray-900 hover:underline">Twitter</a></li>
              <li><a href="#!" className="text-gray-900 hover:underline">Facebook</a></li>
            </ul>
          </div> 
        </div>
        <div className="flex justify-between items-center border-t border-gray-200 mt-8 pt-8">
          <p className="flex-grow text-center sm:text-left">&copy; 2024 InstaStaff. All rights reserved.</p>
          <div className="flex-initial">
            <a href="#!" className="text-gray-900 hover:underline mx-2">Privacy & Policy</a>
            <a href="#!" className="text-gray-900 hover:underline mx-2">Terms & Condition</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;