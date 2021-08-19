import { useState } from "react";
import { useHistory } from "react-router-dom";

function useLocalStorage(appKey = "joblyUser", initialValue = {}) {

    // GET: 
    //  check for user / token in localstorage
    //  found? set currToken
    //  not found? use initialValue 

    // SET:
    // once successfully signed up or signed in, save the user
    //  to localstorage

    // CLEAR localStorage with removeUserFx
    // clear user/key from localStorage when signing out.

    const lsUser = JSON.parse(localStorage.getItem(appKey)) || initialValue;

    const [currUser, setCurrUser] = useState(lsUser);

    const setUserFx = (user) => {
        localStorage.setItem(appKey, JSON.stringify(user));
        setCurrUser(user);
    }

    const removeUserFx = () => {
        localStorage.removeItem(appKey);
        setCurrUser(initialValue)
    }

    const getUserFx = () => {
        setCurrUser(JSON.parse(localStorage.getItem(appKey)));
    }

    return [currUser, setUserFx, removeUserFx, getUserFx];

}

/**
 * useRouteProtection() hook redirects unauthenticated visitors to the route 
 *  specified by whereToNoAuth (defaults to /login). The calling component 
 *  continues when the visitor is authorized. 
 * @param {*} whereToNoAuth, string, the redirection route when the visitor is 
 *  not authorized.  
 * @returns an array with currUser object and 2 callback functions - setUser and 
 *  removeUser.
 */
function useRouteProtection(whereToNoAuth="/login") {

    const [currUser, setUser, removeUser] = useLocalStorage();

    const history = useHistory();

    // Redirect to whereTo when there is no token / not signed in. 
    if (!(currUser.token)) history.push(whereToNoAuth);

    return [currUser, setUser, removeUser];

}

export { useLocalStorage, useRouteProtection };