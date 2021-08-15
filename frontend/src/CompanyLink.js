import React from "react";
import { Link } from "react-router-dom";

import "./CompanyLink.css";

const CompanyLink = ({ handle, name, desc }) => {

    console.log(`CompanyLink component: handle=${handle}, name=${name}, description=${desc}`);
    // console.dir(props);
    return (
        <li>
            <Link to={`/companies/${handle}`} >{name}


            </Link> ~~ {desc}
        </li>
    )

}

export default CompanyLink;
