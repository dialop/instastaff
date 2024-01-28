import React from "react";

const JobPostings = () => {
  return (
    <div className="flex flex-col h-[100vh] m-20">
        <h1 className="text-6xl pb-8 text-[#24233E]">Jobs</h1>

      <div className="relative overflow-hidden h-[300px] w-[350px] rounded-lg bg-white text-left shadow-[0_1px_10px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <div className="p-6 z-0">
          <h5 className="mb-2.5 text-xl font-medium leading-tight">
            Elysium Medical Center
          </h5>
          <p className="mb-4 text-base">
            Lorem Ipsum has been the industry's standard.
          </p>
        </div>
        <div className="lower-card absolute w-full bottom-0 px-6 z-10 bg-white">
          <div className="job-btns">
            <p className="mb-8 text-base font-medium">$52.00/ hr</p>
            <button
              type="button"
              className="inline-block rounded px-6 pb-2 mb-1 pt-2.5 mr-4 text-xs font-medium uppercase leading-normal shadow-[0_2px_7px_-3px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
            >
              Details
            </button>
            <button
              type="button"
              className="bg-[#6547A5] hover:bg-[#7D67AC] text-white inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-[0_2px_7px_-3px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
            >
              Accept Job
            </button>
            {/* <p className="mt-8 w-full text-center rounded px-6 pb-2 mb-1 pt-2.5 mr-4 text-xs font-medium uppercase leading-normal shadow-[0_1px_5px_-3px_#3b71ca] transition duration-150 ease-in-out bg-gray-100">Reserved</p> */}
          </div>
          <div className="px-1 py-3 text-[#7775ad]">2 days ago</div>
        </div>
      </div>
    </div>
  );
};

export default JobPostings;