import React from "react";

const Hero = () => {
  return (
    <>
      <section className="w-full flex justify-center bg-blue-100">
        <div className="w-full flex container bg-blue-100 px-24">
          <div className="w-full flex flex-wrap justify-between bg-blue-100 md:justify-center">
            <div className="w-[100%] transform hover:translate-x-16 transition ease-in-out duration-1000 z-10 w-[600px] mr-8 m-4 bg-white p-8 rounded-lg md:mr-8 shadow-lg">
              <h2 className="mb-4 text-2xl text-center md:text-4xl text-black font-heading font-semibold">
                ADVANCE YOUR CAREER
              </h2>
              <p className="text-black font-heading font-medium">
                Elevate your nursing journey with InstaStaff. Seamlessly
                navigate job opportunities, manage your schedule effortlessly,
                and connect with care institutions seeking your expertise.
                Explore how InstaStaff can enhance your professional path and
                open doors to fulfilling opportunities.
              </p>
            </div>
            <div className="w-[100%] transform hover:-translate-x-16 transition ease-in-out duration-1000 z-10 w-[600px] m-4 bg-white p-8 rounded-lg shadow-lg">
              <h2 className="mb-4 text-2xl text-center md:text-4xl text-black font-heading font-semibold">
                OPTIMIZE YOUR STAFFING
              </h2>
              <p className="text-black font-heading font-medium">
                Transform your staffing process with InstaStaff. Streamline
                hiring, effortlessly manage shifts, and uncover a pool of
                qualified nursing professionals ready to bolster your team.
                Discover how InstaStaff can enhance the operations of your care
                institution.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
