import React from "react";
import { useHistory } from "react-router-dom";


/**
 * AuthSignIn() component asks for username and password and authenticates them.  
 * @param {*} param0, deconstructed props, contains setCurrUserFx which sets state 
 *  with the token and username for the authenticated user. 
 * @returns a component with the form fields necessary for a signin. Redirection to 
 *  the jobs page occurs on successful authentication / signin of the returning visitor.
 */
const AuthSignOut = ({ removeUserFx, whereTo = "/" }) => {

    const history = useHistory();

    // setCurrUserFx({});
    removeUserFx();
    history.push(whereTo);

    return null;

}

export default AuthSignOut;

