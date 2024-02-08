import React, { useState } from "react";

const Testimonials = () => {
  return (
    <>
      <section className="py-24 overflow-hidden">
        <h2 className="text-center text-6xl md:text-7xl font-bold w-full">
          Trusted by thousands of happy Clients.
        </h2>
        <p className="text-center w-full text-lg text-gray-900 font-medium mt-8 mb-24">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad
          minim veniam
        </p>
        <div className="container px-4 mx-auto">
          <div className="w-[100%] flex -m-8 sm:flex-col items-center md:flex-row md:items-center">
            <div className="px-8 md:w-1/3 bg-white rounded-lg mr-2 mb-2">
              <div className="py-8 md:max-w-xs mx-auto text-justify">
                <div className="flex justify-center mb-6 -m-1">
                  <div className="w-auto p-1">
                    <svg
                      width="24"
                      height="23"
                      viewBox="0 0 24 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 0L15.708 7.512L24 8.7168L18 14.5656L19.416 22.824L12 18.9264L4.584 22.824L6 14.5656L0 8.7168L8.292 7.512L12 0Z"
                        fill="#4F46E5"
                      ></path>
                    </svg>
                  </div>
                  <div className="w-auto p-1">
                    <svg
                      width="24"
                      height="23"
                      viewBox="0 0 24 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 0L15.708 7.512L24 8.7168L18 14.5656L19.416 22.824L12 18.9264L4.584 22.824L6 14.5656L0 8.7168L8.292 7.512L12 0Z"
                        fill="#4F46E5"
                      ></path>
                    </svg>
                  </div>
                  <div className="w-auto p-1">
                    <svg
                      width="24"
                      height="23"
                      viewBox="0 0 24 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 0L15.708 7.512L24 8.7168L18 14.5656L19.416 22.824L12 18.9264L4.584 22.824L6 14.5656L0 8.7168L8.292 7.512L12 0Z"
                        fill="#4F46E5"
                      ></path>
                    </svg>
                  </div>
                  <div className="w-auto p-1">
                    <svg
                      width="24"
                      height="23"
                      viewBox="0 0 24 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 0L15.708 7.512L24 8.7168L18 14.5656L19.416 22.824L12 18.9264L4.584 22.824L6 14.5656L0 8.7168L8.292 7.512L12 0Z"
                        fill="#4F46E5"
                      ></path>
                    </svg>
                  </div>
                  <div className="w-auto p-1">
                    <svg
                      width="24"
                      height="23"
                      viewBox="0 0 24 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 0L15.708 7.512L24 8.7168L18 14.5656L19.416 22.824L12 18.9264L4.584 22.824L6 14.5656L0 8.7168L8.292 7.512L12 0Z"
                        fill="#4F46E5"
                      ></path>
                    </svg>
                  </div>
                </div>
                <h3 className="mb-4 text-[1.28rem] font-semibold leading-snug md:text-[1.1rem]">
                  <span>
                    “Navigating through the job site was a breeze, with
                    intuitive design and clear instructions at every step. The ability to
                    search saved me hours,
                    and truly matched my skills and career aspirations.”
                  </span>
                </h3>
                <h3>
                  <p className="text-gray-600 font-medium">Emily Smith</p>
                </h3>
              </div>
            </div>
            <div className="px-8 md:w-1/3 bg-white rounded-lg mr-2 mb-2">
              <div className="py-8 md:max-w-xs mx-auto text-justify">
                <div className="flex justify-center mb-6 -m-1">
                  <div className="w-auto p-1">
                    <svg
                      width="24"
                      height="23"
                      viewBox="0 0 24 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 0L15.708 7.512L24 8.7168L18 14.5656L19.416 22.824L12 18.9264L4.584 22.824L6 14.5656L0 8.7168L8.292 7.512L12 0Z"
                        fill="#4F46E5"
                      ></path>
                    </svg>
                  </div>
                  <div className="w-auto p-1">
                    <svg
                      width="24"
                      height="23"
                      viewBox="0 0 24 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 0L15.708 7.512L24 8.7168L18 14.5656L19.416 22.824L12 18.9264L4.584 22.824L6 14.5656L0 8.7168L8.292 7.512L12 0Z"
                        fill="#4F46E5"
                      ></path>
                    </svg>
                  </div>
                  <div className="w-auto p-1">
                    <svg
                      width="24"
                      height="23"
                      viewBox="0 0 24 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 0L15.708 7.512L24 8.7168L18 14.5656L19.416 22.824L12 18.9264L4.584 22.824L6 14.5656L0 8.7168L8.292 7.512L12 0Z"
                        fill="#4F46E5"
                      ></path>
                    </svg>
                  </div>
                  <div className="w-auto p-1">
                    <svg
                      width="24"
                      height="23"
                      viewBox="0 0 24 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 0L15.708 7.512L24 8.7168L18 14.5656L19.416 22.824L12 18.9264L4.584 22.824L6 14.5656L0 8.7168L8.292 7.512L12 0Z"
                        fill="#4F46E5"
                      ></path>
                    </svg>
                  </div>
                  <div className="w-auto p-1">
                    <svg
                      width="24"
                      height="23"
                      viewBox="0 0 24 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 0L15.708 7.512L24 8.7168L18 14.5656L19.416 22.824L12 18.9264L4.584 22.824L6 14.5656L0 8.7168L8.292 7.512L12 0Z"
                        fill="#4F46E5"
                      ></path>
                    </svg>
                  </div>
                </div>
                <h3 className="mb-4 text-[1.28rem] font-semibold leading-snug md:text-[1.1rem]">
                  <span>
                    “I was thoroughly impressed by the quality of job listings
                    on the site. Each posting provided detailed information
                    about the role and company, and it was clear that the site
                    only featured reputable organizations.”
                  </span>
                </h3>
                <h3>
                  <p className="text-gray-600 font-medium">Jack Harris</p>
                </h3>
              </div>
            </div>
            <div className="px-8 md:w-1/3 bg-white rounded-lg mb-2">
              <div className="py-8 md:max-w-xs mx-auto text-justify">
                <div className="flex justify-center mb-6 -m-1">
                  <div className="w-auto p-1">
                    <svg
                      width="24"
                      height="23"
                      viewBox="0 0 24 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 0L15.708 7.512L24 8.7168L18 14.5656L19.416 22.824L12 18.9264L4.584 22.824L6 14.5656L0 8.7168L8.292 7.512L12 0Z"
                        fill="#4F46E5"
                      ></path>
                    </svg>
                  </div>
                  <div className="w-auto p-1">
                    <svg
                      width="24"
                      height="23"
                      viewBox="0 0 24 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 0L15.708 7.512L24 8.7168L18 14.5656L19.416 22.824L12 18.9264L4.584 22.824L6 14.5656L0 8.7168L8.292 7.512L12 0Z"
                        fill="#4F46E5"
                      ></path>
                    </svg>
                  </div>
                  <div className="w-auto p-1">
                    <svg
                      width="24"
                      height="23"
                      viewBox="0 0 24 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 0L15.708 7.512L24 8.7168L18 14.5656L19.416 22.824L12 18.9264L4.584 22.824L6 14.5656L0 8.7168L8.292 7.512L12 0Z"
                        fill="#4F46E5"
                      ></path>
                    </svg>
                  </div>
                  <div className="w-auto p-1">
                    <svg
                      width="24"
                      height="23"
                      viewBox="0 0 24 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 0L15.708 7.512L24 8.7168L18 14.5656L19.416 22.824L12 18.9264L4.584 22.824L6 14.5656L0 8.7168L8.292 7.512L12 0Z"
                        fill="#4F46E5"
                      ></path>
                    </svg>
                  </div>
                  <div className="w-auto p-1">
                    <svg
                      width="24"
                      height="23"
                      viewBox="0 0 24 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 0L15.708 7.512L24 8.7168L18 14.5656L19.416 22.824L12 18.9264L4.584 22.824L6 14.5656L0 8.7168L8.292 7.512L12 0Z"
                        fill="#4F46E5"
                      ></path>
                    </svg>
                  </div>
                </div>
                <h3 className="mb-4 text-[1.28rem] font-semibold leading-snug md:text-[1.1rem]">
                  <span>
                    “The resources and support offered by the site were
                    outstanding. The prompt and helpful customer service felt like I
                    had a personal career coach guiding me through my job search
                    journey.”
                  </span>
                </h3>
                <h3>
                  <p className="text-gray-600 font-medium">Sophia Nguyen</p>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
