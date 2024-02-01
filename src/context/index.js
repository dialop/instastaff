import React, { createContext } from 'react'
import { useJobs} from '../hooks/useJobs'


const JobsContext = createContext()

function JobsContextProvider({children}){

    const jobData = useJobs()

    return (
        <JobsContext.Provider
            value={
                {
                  jobData
                }
            }
        >
            {children}
        </JobsContext.Provider>
    )
}

export { JobsContextProvider, JobsContext }