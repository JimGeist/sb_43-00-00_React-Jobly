import React from "react";
import { Link } from "react-router-dom";
import addCommas from "./helpers/addCommas";

import "./Job.css";

const Job = ({ id, title, salary, equity, companyHandle, companyName, classHide = "" }) => {

    return (
        <li>{title}
            <span className={`${classHide}`}> with <Link to={`/companies/${companyHandle}`} >{companyName}</Link> </span>
            {salary || equity > 0 ? ":" : ""} {salary ? `$${addCommas(salary)} ` : ""}{equity > 0 ? `equity stake of ${equity}%` : ""} </li>
    )

}

export default Job;
