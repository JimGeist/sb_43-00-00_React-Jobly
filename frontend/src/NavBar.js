import React from "react";
import "./NavBar.css";
import { NavItemLink, NavItemAuth } from "./NavItems";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem, Button, NavbarText } from "reactstrap";

function NavBar({ currUser = { username: "", token: "" } }) {
  console.log("NavBar: currUser=", currUser)
  return (
    <div>
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand ">
          Jobly
        </NavLink>

        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink to="/companies">Companies</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/jobs">Jobs</NavLink>
          </NavItem>
          {!(currUser.token) ? <NavItemAuth /> : ""}

          <NavItem className="mr-2">
            {(currUser.token)
              ? <Button outline color="primary"><NavLink to="/signout">Sign Out</NavLink></Button>
              : ""
            }
          </NavItem>
        </Nav>
        <NavbarText>{currUser.username}</NavbarText>
      </Navbar>
    </div>
  );
}

export default NavBar;
