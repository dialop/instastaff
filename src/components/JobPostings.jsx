import React, { useContext, useState, useEffect } from "react";
import { JobsContext } from "../context";
import Modal from "./JobPostingsModal";
import { FaCheckToSlot } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import moment from "moment";
import "moment-timezone";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import notifications from "../helpers/notifications";

TimeAgo.addDefaultLocale(en);

const JobPostings = () => {
  const { jobData, setJobData } = useContext(JobsContext);

  const [open, setOpen] = useState(false);
  const [jobId, setJobId] = useState(0);
  const [jobStatus, setJobStatus] = useState({ is_filled: false });
  const [updateJob, setUpdateJob] = useState(false);
  //Search
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [displaySearchResults, setDisplaySearchResults] = useState(false);
  const [searchResult, setSearchResult] = useState();

  useEffect(
    (e) => {
      if (updateJob) {
        handleupdateJob();
      }
    },
    [updateJob, jobId, searchResult]
  );

  const clickedJob = (jobId) => {
    return jobData.find((job) => job.id === jobId);
  };

  const handleupdateJob = async (e) => {
    let id = Number(jobId);
    try {
      const url = `http://localhost:3000/api/jobs/${id}`;
      const method = "PUT";
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobStatus),
      });

      if (response.ok) {
        setJobData((prevJobData) =>
          prevJobData.map((job) =>
            job.id === id ? { ...job, is_filled: !prevJobData.is_filled } : job
          )
        );
        console.log("Job Status updated successfully", jobStatus);
        if (!jobStatus.is_filled) {
          window.location.reload();
        }
        setUpdateJob(false);
      } else {
        console.error("Error updating job status:", response.statusText);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleNotifications = async (job) => {
    // const sendAppNotifications = notifications(job);
    // sendAppNotifications();
  };

  const fetchJobs = async () => {
    console.log(
      selectedHospital,
      selectedJobTitle,
      selectedGender,
      selectedDate
    );
    try {
      const queryParams = new URLSearchParams({
        facility_name: selectedHospital,
        title: selectedJobTitle,
        gender: selectedGender,
        date: selectedDate,
      });

      const response = await fetch(
        `http://localhost:3000/api/jobs/search?${queryParams}`
      );
      const data = await response.json();
      console.log(data);
      setSearchResult(data);
      setDisplaySearchResults(true);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="container h-[100vh] m-20 min-w-[320px]">
          <div className="heading flex flex-col justify-center items-center">
            <h1 className="text-6xl pb-8 text-[#24233E]">Jobs</h1>
            <div className="flex mb-16">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                <div className="flex justify-between items-center">
                  <h2 className="pl-1 text-stone-700 text-xl font-medium">
                    Filters
                  </h2>
                  <div className="flex flex-end items-center">
                    <button
                      className="rounded-md bg-[#6547A5] px-8 py-2 mr-4 font-medium text-white outline-none focus:ring hover:opacity-90"
                      onClick={() => {
                        fetchJobs();
                      }}
                    >
                      Search
                    </button>
                    <GrPowerReset
                      className="bg-[#6547A5] text-white rounded-md p-2 text-4xl outline-none focus:ring hover:opacity-90"
                      onClick={() => setDisplaySearchResults(false)}
                    />
                  </div>
                </div>
                <div className="w-full mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                  <div className="flex flex-col">
                    <select
                      id="hospital"
                      className="mt-1 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                      value={selectedHospital}
                      onChange={(e) => setSelectedHospital(e.target.value)}
                    >
                      <option value="" disabled>
                        Hospital
                      </option>
                      <option value="Aurelia Medical Group">
                        Aurelia Medical Group
                      </option>
                      <option value="Veritas Health Systems">
                        Veritas Health Systems
                      </option>
                      <option value="Elysium Medical Center">
                        Elysium Medical Center
                      </option>
                      <option value="NeuraMed Nexus">NeuraMed Nexus</option>
                      <option value="NeuraCore LifeCare">
                        NeuraCore LifeCare
                      </option>
                      <option value="NeuraSphere Innovare">
                        NeuraSphere Innovare
                      </option>
                      <option value="RegenXcel MediCare">
                        RegenXcel MediCare
                      </option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <select
                      id="job-title"
                      className="mt-1 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                      value={selectedJobTitle}
                      onChange={(e) => setSelectedJobTitle(e.target.value)}
                    >
                      <option value="" disabled>
                        Job Title
                      </option>
                      <option value="Personal Support Worker">
                        Personal Support Worker
                      </option>
                      <option value="Registered Nurse">Registered Nurse</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <select
                      id="gender"
                      className="mt-1 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                      value={selectedGender}
                      onChange={(e) => setSelectedGender(e.target.value)}
                    >
                      <option value="" disabled>
                        Gender
                      </option>
                      <option value="Any">Any</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <input
                      type="date"
                      id="date"
                      className="mt-1 block w-full rounded-md border border-gray-200 px-2 py-1.5 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap:8 3xl:grid-cols-4 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 xs:flex justify-center gap-8">
            {(displaySearchResults ? searchResult : jobData).map(
              (job, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden h-[270px] w-[350px] rounded-lg bg-white text-left shadow-[0_1px_10px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex flex-row justify-between px-6 pt-6">
                    <h5 className="text-xl font-medium">{job.facility_name}</h5>
                    {job.is_filled ? (
                      <p className="text-green-500 text-4xl">
                        <FaCheckToSlot />
                      </p>
                    ) : null}
                  </div>
                  <div className="flex flex-row px-6 pt-2">
                    <p className="mb-4 text-base">{job.title}</p>
                  </div>
                  <div className="lower-card absolute w-full bottom-0 px-6 bg-white">
                    <div className="job-btns">
                      <p className="mb-8 text-base font-medium">
                        ${job.rate}/ hr
                      </p>
                      <button
                        type="button"
                        className="bg-[#6547A5] text-white inline-block rounded w-full px-6 pb-2 mb-1 pt-2.5 mr-4 text-xs font-medium uppercase leading-normal shadow-[0_2px_7px_-3px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
                        onClick={() => {
                          setOpen(!open);
                          setJobId(job.id);
                        }}
                      >
                        Details
                      </button>
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
              )
            )}
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
                      {moment(
                        clickedJob(jobId).date,
                        "YYYY-MM-DDTHH:mm:sssZ"
                      ).format("MMMM Do YYYY")}
                    </p>
                    <p className="text-[1.15rem] text-black mt-1">
                      {moment(clickedJob(jobId).start_time, "HH:mm:ss").format(
                        "h:mm A"
                      )}
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
                  {/* <p className="text-black mt-4"> */}
                  <ul className="text-black mt-1">
                    Provide compassionate and professional nursing care to
                    patients.
                    <br />
                    Assess patients' health conditions and develop care plans.
                    <br />
                    Administer medications and treatments as prescribed by
                    physicians.
                    <br />
                    Monitor and record patient vital signs.
                    <br />
                    Collaborate with healthcare teams to ensure optimal patient
                    outcomes.
                    <br />
                    Educate patients and their families about health conditions
                    and treatment plans.
                    <br />
                    Maintain accurate patient records and documentation.
                  </ul>
                  {/* </p> */}
                  {clickedJob(jobId).is_filled ? (
                    <div className="absolute w-full pr-16 py-8 bottom-0 flex flex-row gap-2">
                      <button
                        onClick={() => setOpen(!open)}
                        className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold text-lg rounded-lg"
                      >
                        Close
                      </button>
                      <button
                        className="flex-1 bg-[#9e2e2a] text-white inline-block rounded-lg px-6 pb-2 pt-2.5 font-medium uppercase shadow-[0_2px_7px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700"
                        onClick={() => {
                          setJobStatus((prevJobStatus) => ({
                            ...prevJobStatus,
                            is_filled: false,
                          }));
                          setUpdateJob((prev) => !prev);
                        }}
                      >
                        Cancel Shift
                      </button>
                    </div>
                  ) : (
                    <div className="absolute w-full pr-16 py-8 bottom-0 flex flex-row gap-2">
                      <button
                        onClick={() => setOpen(!open)}
                        className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold text-lg rounded-lg"
                      >
                        Close
                      </button>
                      <button
                        className="flex-1 bg-[#6547A5] text-white inline-block rounded-lg px-6 pb-2 pt-2.5 font-medium uppercase shadow-[0_2px_7px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700"
                        onClick={() => {
                          setJobStatus((prevJobStatus) => ({
                            ...prevJobStatus,
                            is_filled: true,
                          }));
                          setUpdateJob((prev) => !prev);
                          handleNotifications(clickedJob(jobId));
                        }}
                      >
                        Accept Job
                      </button>
                    </div>
                  )}
                </div>
              </Modal>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default JobPostings;
