import React, { createContext } from 'react'
import { useJobs} from '../hooks/useJobs'


const JobsContext = createContext()

function JobsContextProvider({children}){

    const {jobData, setJobData} = useJobs()

    return (
        <JobsContext.Provider
            value={
                {
                  jobData,
                  setJobData
                }
            }
        >
            {children}
        </JobsContext.Provider>
    )
}

export { JobsContextProvider, JobsContext }