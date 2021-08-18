import { useState } from "react";

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

export { useLocalStorage };