import React from "react";
import "./NavItems.css";
import { NavLink } from "react-router-dom";
import { NavItem } from "reactstrap";

function NavItemLink({ navTo = "/", navDisplay = "root" }) {
    return (

        <NavItem>
            <NavLink to={navTo}>{navDisplay}</NavLink>
        </NavItem>

    );
}

function NavItemAuth() {
    return (
        <>
            <NavItemLink navTo="/login" navDisplay="Sign In" />
            <NavItemLink navTo="/signup" navDisplay="Sign Up" />
        </>

    );
}


export { NavItemLink, NavItemAuth };
