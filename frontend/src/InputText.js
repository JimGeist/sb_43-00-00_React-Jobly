import React from "react";
import "./InputText.css";

const InputText = ({ fieldName,
    fieldRequired = true,
    inputType = "text",
    includeLabel = true,
    textLabel = "",
    textPlaceHolder = "",
    onChangeFx,
    fieldValue,
    fieldError }) => {

    return (
        <>
            {
                includeLabel
                    ? <label className="InputText-label" htmlFor={fieldName} >{textLabel}</label>
                    : ""
            }

            <input className="InputText-input" key={fieldName} id={fieldName} name={fieldName}
                type={inputType}
                placeholder={textPlaceHolder}
                required
                value={fieldValue}
                onChange={onChangeFx} />
            <span className="InputText-error">{fieldError}&nbsp;</span>
        </>
    )
}

export default InputText;
