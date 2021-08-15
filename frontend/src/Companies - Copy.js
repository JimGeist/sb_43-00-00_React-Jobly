import React from "react";
import JoblyApi from "./helpers/api";
import "./Companies.css";

const Companies = () => {

    async function getCompaniesTest() {
        let company = await JoblyApi.getCompany("ayala-buchanan");
        console.log(`company w/jobs: ${company}`);
        console.dir(company);

        company = await JoblyApi.getCompany("morgan-sullivan");
        console.log(`company w/o jobs: ${company}`);
        console.dir(company);

        const companies = await JoblyApi.getCompanies();
        console.log(`companies: `);
        console.dir(companies);
    }

    getCompaniesTest();

    return (
        <h1>company rough in, very rough in!</h1>
    )

}

export default Companies;
