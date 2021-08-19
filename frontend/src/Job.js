import React from "react";
import { Link } from "react-router-dom";
import { addCommas } from "./helpers/helpers";

import "./Job.css";

const Job = ({ id, title, salary, equity, companyHandle, companyName, classHide = "", userJobList = [], applyFx }) => {

    const handleApply = (event) => {
        console.log("Job component - handleApply: id=", event.target.dataset.id);
        console.log("Job component - handleApply: event=", event);
        applyFx(event.target.dataset.id);
    }

    const userJobs = new Set([...userJobList]);

    return (
        <li className="Job-li">{title}
            <span className={`${classHide}`}> with <Link to={`/companies/${companyHandle}`} >{companyName}</Link> </span>
            {salary || equity > 0 ? ":" : ""} {salary ? ` $${addCommas(salary)}` : ""}{equity > 0 ? ` equity stake of ${equity}%` : ""}
            {
                userJobs.has(id)
                    ? <span className="Job-SpanApplied">&nbsp;already applied</span>
                    : <button className="Job-BtnApply" data-id={id} onClick={handleApply}>Apply</button>
            }

        </li>
    )

}

export default Job;
