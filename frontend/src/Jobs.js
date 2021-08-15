import React, { useState, useEffect } from "react";
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
const Jobs = ({ jobs = [], classHide = "" }) => {

    // jobs array, when it has values, consists of {id, title, salary, equity}
    // jobs array, when it has no values and required retrieval by using the api, consists of
    //  {id, title, salary, equity, companyHandle, companyName}

    const [jobList, setJobList] = useState(jobs);

    // load the jobList on initial render of the page. The load via api call is bypassed when
    //  props.jobs contains a jobs / length is not zero.
    useEffect(() => {

        async function getAllJobs() {

            console.log("Jobs component: getAllJobs");

            setJobList(await JoblyApi.getJobs());

        }

        console.log("Jobs component: in useEffect");

        if (jobList.length === 0) getAllJobs();

    }, []);


    return (

        <ul className="Jobs-ul">
            <h3>don't forget job filtering!</h3>
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
                            classHide={classHide} />
                    })
            }
        </ul >
    )

}


export default Jobs;
