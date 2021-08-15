import React, { useState } from "react";
import InputText from "./InputText"
import "./Auth.css";

/**
 * Auth({signIn}) component will solicit username, password, firstName, lastName, 
 *  and email for signup (signIn = false) or username and password for signin 
 *  (signIn = true). signin is the default operation. 
 * @param {*} param0 
 * @returns 
 */
const Auth = ({ signIn = true }) => {
    // Auth() component will solicit username, password, firstName, lastName, 
    //  and email. username and password are the only fields that appear on the form
    //  when signIn is true.
    const INITIAL_VALUES = {
        userName: "xusernamex",
        password: "xpasswordx",
        passwordConf: "xpasswordx",
        firstName: "xfirstnamex",
        lastName: "xlastnamex",
        email: "xemailx"
    };

    const [formData, setFormData] = useState(INITIAL_VALUES);

    const handleSubmit = (event) => {
        event.preventDefault();

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((formData) => (
            { formData, [name]: value }
        ));
    }

    const signUpFields = () => {

        return (
            <>
                <InputText fieldName="firstName" textLabel="First Name:" onChangeFx={handleChange}
                    fieldValue={formData.firstName} />
                <InputText fieldName="lastName" textLabel="Last Name:" onChangeFx={handleChange}
                    fieldValue={formData.lastName} />
            </>
        )

    }

    return (
        <form onSubmit={handleSubmit}>
            <InputText fieldName="userName" textLabel="Username:" onChangeFx={handleChange}
                fieldValue={formData.userName} />
            <InputText fieldName="password" inputType="password" textLabel="Password:" onChangeFx={handleChange}
                fieldValue={formData.password} />
            <InputText fieldName="passwordConf" inputType="password" textLabel="Confirm Password:" onChangeFx={handleChange}
                fieldValue={formData.passwordConf} />
            {signIn ? "" : signUpFields()}

            <button className="Auth-btnSubmit">{signIn ? "Sign In" : "Sign Up"}</button>
        </form>
    )
}

export default Auth;

