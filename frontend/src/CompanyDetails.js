import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./helpers/api";
import { Navbar, Nav, NavItem, Button } from "reactstrap";
import CompanyCard from "./CompanyCard";
import "./CompanyDetails.css";

const CompanyDetails = () => {

    // "ayala-buchanan" has the most jobs, "morgan-sullivan" was altered by deleting the one job

    const { handle } = useParams();

    const [company, setCompany] = useState("");

    // load the company on initial render of the page.
    useEffect(() => {

        async function getCompanyDetails(handle) {

            // console.log("companies component: getAllCompanies");

            setCompany(await JoblyApi.getCompany(handle));

        }

        console.log(`ompanyDetails component: in useEffect, params.handle=${handle}`);

        getCompanyDetails(handle);

    }, []);


    return (

        <>
            {
                company === ""
                    ? <h1>Loading</h1>
                    : <CompanyCard key={company.handle}
                        handle={company.handle}
                        name={company.name}
                        desc={company.description}
                        numEmployees={company.numEmployees}
                        logoUrl={company.logoUrl}
                        inJobs={[...company.jobs]}
                    />
            }
        </>
    )

}

export default CompanyDetails;
