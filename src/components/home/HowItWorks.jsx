import React from "react";
import { HiDocumentMagnifyingGlass } from "react-icons/hi2";
import { FaUserNurse } from "react-icons/fa";
import { FaCalendarPlus } from "react-icons/fa";
import wavyline from '../../assets/wavyline.svg'

const HowItWorks = () => {
  return (
    <>
      <section className="w-full pt-40 pb-32 bg-white overflow-hidden">
        <div className="w-full container px-4 mx-auto">
          <h2 className="text-center text-6xl md:text-7xl font-bold w-full">
            How It Works
          </h2>
          <p className="text-center w-full mb-24 text-lg text-gray-900 font-medium mt-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad
            minim veniam
          </p>
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center w-full md:w-1/2 lg:w-1/4 p-4">
              <div className="flex flex-wrap items-center mb-7 -m-2">
                <div className="w-auto p-2 ">
                  <div className="relative w-20 h-20 text-2xl font-bold font-heading bg-indigo-100 rounded-xl">
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <FaUserNurse  className="w-10 h-10 text-[#6547A5]" />
                    </span>
                  </div>
                </div>
                <div className="flex-1 p-2">
                  <div className="w-full h-px bg-gray-200"></div>
                </div>
              </div>
              <h3 className="text-center text-lg font-semibold leading-normal md:max-w-xs">
                Aliquam erat volutpat. Integer malesuada turpis id fringilla
                suscipit. Maecenas ultrices, orci vitae convallis mattis.
              </h3>
            </div>
            <div className="flex h-[220px] items-start">
              <img
                className="w-[400px] h-[auto]"
                src={wavyline}
                alt=""
              ></img>
            </div>
            <div className="flex flex-col items-center w-full md:w-1/2 lg:w-1/4 p-8">
              <div className="flex flex-wrap items-center mb-7 -m-2">
                <div className="w-auto p-2 ">
                  <div className="relative w-20 h-20 text-2xl font-bold font-heading bg-indigo-100 rounded-xl">
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <HiDocumentMagnifyingGlass  className="w-10 h-10 text-[#6547A5]" />
                    </span>
                  </div>
                </div>
                <div className="flex-1 p-2">
                  <div className="w-full h-px bg-gray-200"></div>
                </div>
              </div>
              <h3 className="text-center text-lg font-semibold leading-normal md:max-w-xs">
                Aliquam erat volutpat. Integer malesuada turpis id fringilla
                suscipit. Maecenas ultrices, orci vitae convallis mattis.
              </h3>
            </div>

            <div className="flex h-[220px] items-start">
              <img
                className="w-[400px] h-[auto]"
                src={wavyline}
                alt=""
              ></img>
            </div>
           
            <div className="flex flex-col items-center w-full md:w-1/2 lg:w-1/4 p-8">
              <div className="flex flex-wrap items-center mb-7 -m-2">
                <div className="w-auto p-2 ">
                  <div className="relative w-20 h-20 text-2xl font-bold font-heading bg-indigo-100 rounded-xl">
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <FaCalendarPlus  className="w-10 h-10 text-[#6547A5]" />
                    </span>
                  </div>
                </div>
                <div className="flex-1 p-2">
                  <div className="w-full h-px bg-gray-200"></div>
                </div>
              </div>
              <h3 className="text-center text-lg font-semibold leading-normal md:max-w-xs">
                Aliquam erat volutpat. Integer malesuada turpis id fringilla
                suscipit. Maecenas ultrices, orci vitae convallis mattis.
              </h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
