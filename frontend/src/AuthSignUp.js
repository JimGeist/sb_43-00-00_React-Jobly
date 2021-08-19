import React, { useState } from "react";
import JoblyApi from "./helpers/api";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "./hooks/hooks";

import InputText from "./InputText"
import "./AuthSignUp.css";

/**
 * AuthSignUp() component solicits username, password, firstName, lastName, 
 *  and email for signup. 
 * @param {*} param0, deconstructed props, contains setCurrUserFx which sets state
 *  with the token and username for the newly created user.
 * @returns a component with the form fields necessary for a signup. Redirection to 
 *  the jobs page occurs on successful creation of the new user.
 */
const AuthSignUp = ({ setCurrUserFx, whereTo = "/jobs" }) => {
    // AuthSignUp() component will solicit username, password, firstName, lastName, 
    //  and email. 

    const INITIAL_VALUES = {
        username: "",
        password: "",
        passwordConf: "",
        firstName: "",
        lastName: "",
        email: ""
    };

    const [currUser, setUser, removeUser] = useLocalStorage();

    const [formData, setFormData] = useState(INITIAL_VALUES);
    const [formError, setFormError] = useState({ INITIAL_VALUES });

    const history = useHistory();

    // Do not show Signup page to someone who is already signed in. 
    if (currUser.token) history.push(whereTo);

    const handleSubmit = (event) => {
        event.preventDefault();
        async function signUpUser(newUser) {

            try {
                // setCurrUserFx from App component is used because App needs to render in order for the 
                //  NavBar to get updated.
                setCurrUserFx({ username: formData.username, token: await JoblyApi.signUp(newUser) })
                // JoblyApi.signUp returns the token
                // setUser({ username: formData.username, token: await JoblyApi.signUp(newUser) });
                // setCurrUserFx();
                history.push(whereTo);

                // const res = await JoblyApi.signUp(newUser);
            } catch (error) {
                // This is partial error handling. It assumes the error will occur on 
                //  the username field.

                const currErrors = { ...INITIAL_VALUES, username: error[0] };
                setFormError(currErrors);
            }

        }
        // Make sure password matches the confirmation
        // All fields should get validated. For now, only check for matching
        //  password confiramtions.
        if (formData.password === formData.passwordConf) {
            const authData = { ...formData }
            delete authData.passwordConf;
            signUpUser(authData);

        } else {
            const currErrors = { ...INITIAL_VALUES, passwordConf: "Confirmation did not match password." }

            setFormError(currErrors);
        }

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
            <InputText fieldName="passwordConf" inputType="password" textLabel="Confirm Password:" onChangeFx={handleChange}
                fieldValue={formData.passwordConf} fieldError={formError.passwordConf} />
            <InputText fieldName="firstName" textLabel="First Name:" onChangeFx={handleChange}
                fieldValue={formData.firstName} fieldError={formError.firstName} />
            <InputText fieldName="lastName" textLabel="Last Name:" onChangeFx={handleChange}
                fieldValue={formData.lastName} fieldError={formError.lastName} />
            <InputText fieldName="email" textLabel="Email:" onChangeFx={handleChange}
                fieldValue={formData.email} fieldError={formError.email} />

            <button className="AuthSignUp-btnSubmit">Sign Up</button>
        </form>
    )
}

export default AuthSignUp;

