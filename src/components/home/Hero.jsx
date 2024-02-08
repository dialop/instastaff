import React, { useState } from "react";
import medStaff from "../../assets/medStaff.svg";

const Hero = () => {
  return (
    <>
      <section>
        <div className="w-full flex justify-center overflow-hidden">
          <div className="w-full">
            <div className="relative overflow-hidden">
              <div className="relative z-20 flex flex-wrap justify-between items-center -m-22">
                <div className="flex flex-col h-[80vh] justify-center w-full lg:w-1/2 p-24 lg:pr-0 lg:pl-28 lg:py-28">
                  <h2 className="mb-7 text-4xl md:text-5xl xl:text-10xl font-bold">
                    ADVANCE YOUR NURSING CAREER
                    {/* WITH INSTASTAFF */}
                  </h2>
                  <p className="mb-10 text-xl text-gray-900 font-medium pr-4">
                    Elevate your nursing journey with InstaStaff. Seamlessly
                    navigate job opportunities, manage your schedule
                    effortlessly, and connect with care institutions seeking
                    your expertise. Explore how InstaStaff can enhance your
                    professional path and open doors to fulfilling
                    opportunities.
                  </p>
                  <div className="mb-3 md:inline-block">
                    <button
                      className="py-4 px-4 text-[1.1rem] text-white font-normal rounded-xl bg-[#6547A5] hover:opacity-90 transition ease-in-out duration-200"
                      type="button"
                    >
                      <a href="/jobs">Join InstaStaff</a>
                    </button>
                  </div>
                  {/* <p className="text-lg text-gray-800 font-small pl-3">
                    No credit Card required
                  </p> */}
                 
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
