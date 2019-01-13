import React from "react";

export const ErrorMessage = ({formErrors}) =>
    <div>
        {Object.keys(formErrors).map((fieldName, value) => {
            if(formErrors[fieldName].length > 0){
                return (
                    <p key={value}>{fieldName} {formErrors[fieldName]}</p>
                )
            } else {
                return '';
            }
        })}
    </div>;
export default ErrorMessage;