import React, { useState } from "react";
import medStaff from '../../assets/medStaff.svg'

const Hero = () => {
  return (
    <>
      <section>
        <div className="w-full flex justify-center overflow-hidden">
          <div className="w-[80vw]">
            <div className="relative overflow-hidden">
              <div className="relative z-20 flex flex-wrap justify-between items-center -m-25">
                <div
                  className="flex flex-col h-[100vh] justify-center w-full lg:w-1/2 p-24 lg:pr-0 lg:pl-28 lg:py-28">
                  <h2 className="mb-7 text-6xl md:text-7xl xl:text-10xl font-bold">
                    TRANSFORM YOUR COMPANY WITH INSTASTAFF
                  </h2>
                  <p className="mb-10 text-xl text-gray-900 font-medium">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ut enim ad minim veniam, quis nostrud exercitation
                  </p>
                  <div className="mb-3 md:inline-block">
                    <button
                      className="py-4 px-6 text-[1.3rem] text-white font-normal rounded-xl bg-[#6547A5] hover:opacity-90 transition ease-in-out duration-200"
                      type="button"
                    >
                      <a href="/jobs">Get Started Today</a>
                    </button>
                  </div>
                  <p className="text-lg text-gray-800 font-small pl-3">
                    No credit Card required
                  </p>
                </div>
                <div className="w-full lg:w-1/2">
                  <img
                    className="w-[1000px] h-[auto]"
                    src={medStaff}
                    alt=""
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
