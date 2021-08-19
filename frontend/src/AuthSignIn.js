import React, { useState } from "react";
import JoblyApi from "./helpers/api";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "./hooks/hooks";

import InputText from "./InputText"
import "./AuthSignIn.css";

/**
 * AuthSignIn() component asks for username and password and authenticates them.  
 * @param {*} param0, deconstructed props, contains setCurrUserFx which sets state 
 *  with the token and username for the authenticated user. 
 * @returns a component with the form fields necessary for a signin. Redirection to 
 *  the jobs page occurs on successful authentication / signin of the returning visitor.
 */
const AuthSignIn = ({ setCurrUserFx, whereTo = "/jobs" }) => {
    // AuthSignIn() component asks for username and password.

    const INITIAL_VALUES = {
        username: "",
        password: ""
    };

    const [formData, setFormData] = useState(INITIAL_VALUES);
    const [formError, setFormError] = useState({ INITIAL_VALUES });

    const [currUser, setUser, removeUser] = useLocalStorage();

    const history = useHistory();

    // Do not show Signin page to someone who is already signed in. 
    if (currUser.token) history.push(whereTo);

    const handleSubmit = (event) => {
        event.preventDefault();

        async function signInUser(user) {

            try {
                // setCurrUserFx from App component is used because App needs to render in order for the 
                //  NavBar to get updated.
                setCurrUserFx({ username: formData.username, token: await JoblyApi.signIn(user) })
                // setUser({ username: formData.username, token: await JoblyApi.signIn(user) })
                // setCurrUserFx();
                history.push(whereTo);
                // history.push("/");

                // const res = await JoblyApi.signIn(user);
            } catch (error) {
                // This is partial field error handling. It assumes the error will occur on 
                //  the username field.

                const currErrors = { ...INITIAL_VALUES, username: error[0], password: error[0] };
                setFormError(currErrors);
            }

        }

        signInUser(formData);

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(formData => (
            { ...formData, [name]: value }
        ));
    }

    return (
        <form onSubmit={handleSubmit}>
            <InputText fieldName="username" textLabel="Username:" onChangeFx={handleChange}
                fieldValue={formData.username} fieldError={formError.username} />
            <InputText fieldName="password" inputType="password" textLabel="Password:" onChangeFx={handleChange}
                fieldValue={formData.password} fieldError={formError.password} />

            <button className="AuthSignIn-btnSubmit">Sign In</button>
        </form>
    )
}

export default AuthSignIn;

