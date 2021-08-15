import React from "react";
import Jobs from "./Jobs";

import "./CompanyCard.css";

const CompanyCard = ({ handle, name, desc, numEmployees, logoUrl = "", inJobs }) => {

    console.log(`CompanyCard component: handle=${handle}, name=${name}, description=${desc}, numEmployees=${numEmployees}, inJobs=`);
    console.dir(inJobs);

    return (
        <>
            <h1>{[name]}</h1>
            <h3>{desc}</h3>
            <h3>Number of Employees: {numEmployees}</h3>
            {
                inJobs.length === 0
                    ? <h3>There are no open positions at this time.</h3>
                    : <Jobs jobs={[...inJobs]} classHide="Job-HideCompany" />
            }
        </>
    )

}

export default CompanyCard;
