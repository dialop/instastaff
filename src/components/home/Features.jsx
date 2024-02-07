import React from "react";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { SiEasyeda } from "react-icons/si";
import support from '../../assets/support.svg'

const HowItWorks = () => {
  return (
    <>
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto ">
          <h2 className="text-center text-6xl md:text-7xl font-bold w-full">
            Designed with you in Mind
          </h2>
          <p className="text-center w-full mb-10 text-lg text-gray-900 font-medium mt-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad
            minim veniam
          </p>
          <div className="flex flex-wrap xl:items-center">
            <div className="w-full md:w-1/2 p-8">
              <img
                className="w-[100%]"
                src={support}
                alt=""
              />
            </div>
            <div className="w-full flex justify-center md:w-1/2 p-8 ">
              <div className="md:max-w-md">
                <div className="flex flex-wrap -m-4">
                  <div className="w-auto p-4">
                    <div className="flex flex-wrap -m-2">
                      <div className="flex flex-1 flex-row p-2 gap-8">
                      <RiCustomerService2Fill className="text-3xl text-indigo-600" />
                        <h3 className="text-lg font-semibold">
                          Customer Support
                        </h3>
                      </div>
                      <div className="w-full p-2">
                        <div className="pb-8 border-b">
                          <p className="text-gray-600 text-lg font-semibold leading-normal">
                            Aliquam erat volutpat. Integer malesuada turpis id
                            fringilla suscipit. Maecenas ultrices.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-auto p-4">
                    <div className="flex flex-wrap -m-2">
                      <div className="flex flex-1 flex-row p-2 gap-8">
                      <FaUserDoctor className="text-3xl text-indigo-600" />
                        <h3 className="text-lg font-semibold">
                          Vetted Doctors
                        </h3>
                      </div>
                      <div className="w-full p-2">
                        <div className="pb-8 border-b">
                          <p className="text-gray-600 text-lg font-semibold leading-normal">
                            Amet minim mollit non deserunt ullamco est sit
                            aliqua dolor do amet sint. Velit officia consequat
                            duis enim velit mollit. Exercitation veniam
                            consequat.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-auto p-4">
                    <div className="flex flex-wrap -m-2">
                      <div className="flex flex-1 flex-row p-2 gap-8">
                      <SiEasyeda className="text-3xl text-indigo-600" />
                        <h3 className="text-lg font-semibold">
                          Quick and Easy to Use
                        </h3>
                      </div>
                      <div className="w-full p-2">
                        <p className="text-gray-600 text-lg font-semibold leading-normal">
                          Amet minim mollit non deserunt ullamco est sit aliqua
                          dolor do amet sint. Velit officia consequat duis enim
                          velit mollit. Exercitation veniam consequat.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
