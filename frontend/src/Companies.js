import React, { useState, useEffect } from "react";
import JoblyApi from "./helpers/api";
import {useRouteProtection} from "./hooks/hooks";

// import { Navbar, Nav, NavItem, Button } from "reactstrap";
import CompanyLink from "./CompanyLink";
import CompanyFilter from "./CompanyFilter";

import "./Companies.css";

const Companies = () => {

    const [currUser, setUser, removeUser] = useRouteProtection();

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
