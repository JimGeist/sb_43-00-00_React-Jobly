import React, { useState } from "react";
import "./CompanyFilter.css";

const CompanyFilter = ({ activeFilter, setFilterFx }) => {

    const INITIAL_VALUES = { name: "" };

    const [formData, setFormData] = useState(INITIAL_VALUES);

    console.log(`CompanyFilter component: activeFilter=${activeFilter}`);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("button:", event.target);
        if ((formData.name.trim()).length > 0) {
            // name has a value
            setFilterFx(`?name=${formData.name.trim()}`);
        } else {
            setFilterFx("");
        }

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(formData => ({ formData, [name]: value }));
    }

    const handleClear = (event) => {
        setFormData(INITIAL_VALUES);
        setFilterFx("");
    }



    return (
        <form onSubmit={handleSubmit}>
            <label forHtml="name">Company Name is like</label>
            <input key="name" id="name" name="name" type="text" value={formData.name} onChange={handleChange} />

            <button>Apply</button>
            {
                activeFilter ? <button onClick={handleClear}>Clear</button> : ""
            }

        </form>
    )

}

export default CompanyFilter;