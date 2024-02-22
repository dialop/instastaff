import React, { createContext } from 'react'
import { useJobs} from '../hooks/useJobs'
import { useState } from 'react'


const JobsContext = createContext()

function JobsContextProvider({children}){
  const { jobData, setJobData} = useJobs();
    const [isCancelled, setIsCancelled] = useState(false);
    
    const updateJobData = (newJobData) => {
        setJobData(newJobData);
      };


    return (
        <JobsContext.Provider
            value={
                {
                  jobData,
                  setJobData: updateJobData,
                  isCancelled,
                }
            }
        >
            {children}
        </JobsContext.Provider>
    )
}

export { JobsContextProvider, JobsContext }