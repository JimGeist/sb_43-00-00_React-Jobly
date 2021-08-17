import React, { useState } from "react";
import JoblyApi from "./helpers/api";
import { useHistory } from "react-router-dom";

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

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();

        async function signInUser(user) {

            console.log("AuthSignIn component - signInUser(): user=", user);

            // setCompanyList(await JoblyApi.signIn(user));
            try {
                setCurrUserFx({ username: formData.username, token: await JoblyApi.signIn(user) })
                history.push(whereTo);

                // const res = await JoblyApi.signIn(user);
            } catch (error) {
                // This is partial error handling. It assumes the error will occur on 
                //  the username field.
                console.log("AuthSignIn component - signInUser() error: error=", error);
                console.log("   error[0]=", error[0]);

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

