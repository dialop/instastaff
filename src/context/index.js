import React, { createContext } from 'react'
import { useJobs} from '../hooks/useJobs'
import { useState } from 'react'


const JobsContext = createContext()

function JobsContextProvider({children}){
  const { jobData, setJobData} = useJobs();
    const [isCancelled, setIsCancelled] = useState(false);
    

    const cancelJob = async (jobId) => {
        try {
          const response = await fetch(`/api/jobs/${jobId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ is_filled: false, booked_by_user_id: null }),
          });
      
          if (response.ok) {
            const updatedJobData = jobData.map((job) =>
              job.id === jobId ? { ...job, is_filled: false } : job
            );
            setJobData(updatedJobData);
          } else {
            console.error('Failed to cancel job:', response.statusText);
          }
        } catch (error) {
          console.error('Error canceling job:', error);
        }
      };

      const updateJob = async (updatedJob) => {
        try {
          const response = await fetch(`/api/jobs/${updatedJob.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedJob),
          });
    
          if (response.ok) {
            setJobData((prevJobData) =>
              prevJobData.map((job) =>
                job.id === updatedJob.id ? updatedJob : job
              )
            );
          } else {
            console.error('Failed to update job:', response.statusText);
          }
        } catch (error) {
          console.error('Error updating job:', error);
        }
      };

    return (
        <JobsContext.Provider
            value={
                {
                  jobData,
                  setJobData,
                  isCancelled,
                  cancelJob,
                  updateJob
                }
            }
        >
            {children}
        </JobsContext.Provider>
    )
}

export { JobsContextProvider, JobsContext }