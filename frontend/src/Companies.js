import React, { useState, useEffect } from "react";
import JoblyApi from "./helpers/api";
// import { Navbar, Nav, NavItem, Button } from "reactstrap";
import CompanyLink from "./CompanyLink";
import CompanyFilter from "./CompanyFilter";

import "./Companies.css";

const Companies = () => {

    // initial thought is to load them all and have filter buttons on the top and bottom of the 
    //  list. Another option is to load a page with All and filter buttons, but for now, loading 
    //  all.

    // "ayala-buchanan" has the most jobs, "morgan-sullivan" was altered by deleting the one job

    const [companyFilter, setCompanyFilter] = useState("");
    const [companyList, setCompanyList] = useState([]);

    // load the companyList on initial render of the page.
    useEffect(() => {

        async function getAllCompanies() {

            setCompanyList(await JoblyApi.getCompanies(companyFilter));

        }

        getAllCompanies();

    }, [companyFilter]);

    const setFilter = (newFilter) => {
        setCompanyFilter(newFilter);
    }

    return (

        <ul className="Companies-ul">
            <CompanyFilter activeFilter={companyFilter} setFilterFx={setFilter} />
            {
                companyList.length === 0
                    ? <li>company rough in, very rough in!</li>
                    : companyList.map(company =>
                        <CompanyLink key={company.handle} handle={company.handle} name={company.name} desc={company.description} />)
            }
        </ul >
    )

}

export default Companies;
