import React from "react";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { SiEasyeda } from "react-icons/si";
import support from "../../assets/support.svg";

const HowItWorks = () => {
  return (
    <>
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto p-16">
          <h2 className="text-center text-6xl md:text-7xl font-bold w-full">
            Designed to Meet Your Expectations{" "}
          </h2>
          <p className="text-center w-full mb-10 text-lg text-gray-900 font-medium mt-8">
            {/* For prompt assistance or inquiries, our dedicated customer support team is here to help. Contact us via phone, email, or live chat for personalized assistance and solutions tailored to your needs. Your satisfaction is our priority. */}
          </p>
          <div className="flex flex-wrap xl:items-center">
            <div className="w-full md:w-1/2 p-8">
              <img className="w-[100%] transform hover:translate-x-16 transition ease-in-out duration-1000" src={support} alt="" />
            </div>
            <div className="w-full flex justify-center md:w-1/2 p-8 ">
              <div className="md:max-w-md">
                <div className="flex flex-wrap -m-4">
                  <div className="w-auto p-4">
                    <div className="flex flex-wrap -m-2">
                      <div className="flex flex-1 flex-row p-2 gap-8">
                        <SiEasyeda className="text-3xl text-indigo-600" />
                        <h3 className="text-lg font-semibold">
                          Quick and Easy to Use
                        </h3>
                      </div>
                      <div className="w-full p-2">
                        <div className="pb-8 border-b">
                          <p className="text-gray-600 text-lg font-semibold leading-normal">
                            Effortless Exploration Discover our platform with
                            ease. Designed for fluid interaction, simplified
                            processes, and user-friendly interfaces, tasks are
                            completed efficiently. Enjoy stress-free access to
                            our services and resources.
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
                          Vetted Healthcare Professionals
                        </h3>
                      </div>
                      <div className="w-full p-2">
                        <div className="pb-8 border-b">
                          <p className="text-gray-600 text-lg font-semibold leading-normal">
                            Access thoroughly screened healthcare professionals
                            on our platform. Each undergoes rigorous screening
                            for qualifications, experience, and dedication.
                            Trust our verified professionals for exceptional
                            care.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-auto p-4">
                    <div className="flex flex-wrap -m-2">
                      <div className="flex flex-1 flex-row p-2 gap-8">
                        <RiCustomerService2Fill className="text-3xl text-indigo-600" />
                        <h3 className="text-lg font-semibold">
                          Customer Support
                        </h3>
                      </div>
                      <div className="w-full p-2">
                        <p className="text-gray-600 text-lg font-semibold leading-normal">
                          For quick assistance, our dedicated support team is
                          ready to assist you. Reach out to us via phone, email,
                          or live chat for personalized help tailored to your
                          needs. Your satisfaction is our top priority.
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
