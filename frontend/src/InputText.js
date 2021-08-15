import React from "react";
import "./InputText.css";

const InputText = ({ fieldName,
    fieldRequired = true,
    inputType = "text",
    includeLabel = true,
    textLabel = "",
    textPlaceHolder = "",
    onChangeFx,
    fieldValue }) => {

    return (
        <>
            {
                includeLabel
                    ? <label className="InputText-label" forHtml={fieldName} >{textLabel}</label>
                    : ""
            }
            <input className="InputText-input" key={fieldName} id={fieldName} name={fieldName}
                type={inputType}
                placeHolder={textPlaceHolder}
                required
                value={fieldValue}
                onChange={onChangeFx} />
        </>
    )
}

export default InputText;
