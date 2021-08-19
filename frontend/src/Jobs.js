import React, { useState, useEffect } from "react";
import { useRouteProtection } from "./hooks/hooks";
import Job from "./Job";
import JoblyApi from "./helpers/api";
import "./Jobs.css";

/**
 * Jobs(props) component renders a list of possible jobs. Filtering of jobs is possible only
 *  when the jobs are retrieved otherwise the component builds the job list from the jobs passed
 *  in props
 * @param {*} param0 
 * @returns 
 */
const Jobs = ({ jobs = [], classHide = "", whereToNoAuth = "/login" }) => {
    // jobs array, when it has values, consists of {id, title, salary, equity}
    // jobs array, when it has no values and required retrieval by using the api, consists of
    //  {id, title, salary, equity, companyHandle, companyName}

    const [currUser] = useRouteProtection();

    const [userJobs, setUserJobs] = useState([]);

    const [jobList, setJobList] = useState(jobs);

    const [jobJustApplied, setJobJustApplied] = useState(null);

    // load the jobList on initial render of the page. The load via api call is bypassed when
    //  props.jobs contains a jobs / length is not zero.
    useEffect(() => {

        async function getAllJobs() {

            setJobList(await JoblyApi.getJobs());

        }

        if (jobList.length === 0) getAllJobs();

    }, []);


    // load userJobs with the job applications from the api for the logged 
    //  in visitor on initial render of the Jobs component and whenever 
    //  jobJustApplied changes.
    useEffect(() => {

        async function getUserJobs(user) {

            setUserJobs((await JoblyApi.getUser(user)).applications);

        }

        getUserJobs(currUser);

    }, [jobJustApplied]);

    // callback function for apply button. Function sets jobJustApplied with the
    //  jobId returned from the applyForJob api call.
    // Error logic is needed for this function.
    async function apply(jobId) {

        setJobJustApplied((await JoblyApi.applyForJob(currUser, jobId)).applied);

    }


    return (

        <ul className="Jobs-ul">
            {
                jobList.length === 0
                    ? <li>classifieds</li>
                    : jobList.map(job => {
                        const { id, title, salary, equity, companyHandle, companyName } = job
                        return <Job key={id} id={id} title={title}
                            salary={salary}
                            equity={equity}
                            companyHandle={companyHandle}
                            companyName={companyName}
                            classHide={classHide}
                            userJobList={userJobs}
                            applyFx={apply} />
                    })
            }
        </ul >
    )

}


export default Jobs;
