import React from "react";
import { NavItemLink, NavItemAuthLinks, NavItemMainLinks } from "./NavItems";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem, NavbarText } from "reactstrap";

import "./NavBar.css";

function NavBar({ currUser = { username: "", token: "" }, removeUserFx }) {
  // function NavBar() {

  // const [currUser, setUser, removeUser] = useLocalStorage();

  console.log("NavBar: currUser=", currUser)

  return (
    <div>
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand ">
          Jobly
        </NavLink>

        <Nav className="ml-auto" navbar>

          {(currUser.token)
            ? <NavItemMainLinks />
            : <NavItemAuthLinks />}

          <NavItem className="mr-2">
            {(currUser.token)
              ? <NavItemLink navTo="/signout" navDisplay="Sign Out" />
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
