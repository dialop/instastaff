import React, { useContext, useState } from "react";
import { JobsContext } from "../context";
import Modal from "./Modal";
import moment from "moment";
import "moment-timezone";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(en);

const JobPostings = () => {
  const { jobData } = useContext(JobsContext);

  const [open, setOpen] = useState(false);
  const [jobId, setJobId] = useState(0);

  const clickedJob = (jobId) => {
    return jobData.find((job) => job.id === jobId);
  };

  return (
    <>
      <h1 className="text-6xl p-8 text-[#24233E] text-center">Jobs</h1>
      <div className="p-16 grid gap:8 3xl:grid-cols-4 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 xs:flex justify-center gap-8">
        {jobData &&
          jobData.map((job, index) => (
            <div className="relative overflow-hidden h-[270px] w-[350px] rounded-lg bg-white text-left shadow-[0_1px_10px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
              <div className="p-6 z-0">
                <h5 className="mb-2.5 text-xl font-medium leading-tight">
                  {job.facility_name}
                </h5>
                <p className="mb-4 text-base">{job.title}</p>
              </div>
              <div className="lower-card absolute w-full bottom-0 px-6 z-10 bg-white">
                <div className="job-btns">
                  <p className="mb-8 text-base font-medium">${job.rate}/ hr</p>
                  <button
                    type="button"
                    className="inline-block rounded px-6 pb-2 mb-1 pt-2.5 mr-4 text-xs font-medium uppercase leading-normal shadow-[0_2px_7px_-3px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
                    onClick={() => {
                      setOpen(!open);
                      setJobId(job.id);
                    }}
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
                <div className="px-1 py-3 text-[#7775ad]">
                  <ReactTimeAgo
                    key={index}
                    date={Date.parse(job.date)}
                    locale="en-US"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      {open ? (
        <>
          <Modal>
            <div className="relative flex flex-col gap-2 bg-white p-8 rounded-lg h-[600px] w-[38vw] min-w-[330px]">
              <h1 className="text-5xl text-black mt-4 mb-1 ">
                {clickedJob(jobId).facility_name}
              </h1>
              <hr />
              <div className="flex w-full justify-between align-center text-2xl font-medium">
                <h1 className="text-3xl text-black mt-1">
                  {clickedJob(jobId).title}
                </h1>
                <p className="text-xl text-black pt-2">
                  ${clickedJob(jobId).rate}/ hr
                </p>
              </div>
              <div className="flex w-full justify-between text-2xl font-medium">
                <p className="text-[1.15rem] text-black mt-1">
                  {moment(clickedJob(jobId).date, "YYYY-MM-DDTHH:mm:sssZ").format("MMMM Do YYYY")}
                </p>
                <p className="text-[1.15rem] text-black mt-1">
                  {moment(clickedJob(jobId).start_time, "HH:mm:ss").format("h:mm A")}
                </p>
              </div>
              <div className="flex w-full justify-between text-2xl font-medium">
                <p className="text-[1.09rem] text-black">
                  {clickedJob(jobId).type_of_worker}:{" "}
                  {clickedJob(jobId).duration} hours
                </p>
              </div>
              <p className="text-[1rem] text-black">
                Gender : {clickedJob(jobId).gender}
              </p>
              <p className="text-black mt-4">
                It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              {clickedJob(jobId).is_filled ? (
                <div className="absolute w-full pr-16 py-8 bottom-0 flex flex-row gap-2">
                  <button
                    onClick={() => setOpen(!open)}
                    className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold text-lg rounded-lg"
                  >
                    Close
                  </button>
                  <button className="flex-1 bg-[#9e2e2a] text-white inline-block rounded-lg px-6 pb-2 pt-2.5 font-medium uppercase shadow-[0_2px_7px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700">
                    Cancel My Shift
                  </button>
                </div>
              ) : (
                <div className="absolute w-full pr-16 py-8 bottom-0 flex flex-row gap-2">
                  <button
                    onClick={() => setOpen(!open)}
                    className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold text-lg rounded-lg"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 bg-[#7B84D3] text-white inline-block rounded-lg px-6 pb-2 pt-2.5 font-medium uppercase shadow-[0_2px_7px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700">
                    Accept Job
                  </button>
                </div>
              )}
            </div>
          </Modal>
        </>
      ) : null}
    </>
  );
};

export default JobPostings;
