import React, { useState } from "react";
import JoblyApi from "./helpers/api";
import { useHistory } from "react-router-dom";

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

    const [formData, setFormData] = useState(INITIAL_VALUES);
    const [formError, setFormError] = useState({ INITIAL_VALUES });

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        async function signUpUser(newUser) {

            console.log("Auth component - signUpUser(): newUser=", newUser);

            // setCompanyList(await JoblyApi.signUp(newUser));
            try {
                setCurrUserFx({ username: formData.username, token: (await JoblyApi.signUp(newUser)).token })
                history.push(whereTo);

                // const res = await JoblyApi.signUp(newUser);
            } catch (error) {
                // This is partial error handling. It assumes the error will occur on 
                //  the username field.
                console.log("Auth component - signUpUser() error: error=", error);
                console.log("   error[0]=", error[0]);

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

