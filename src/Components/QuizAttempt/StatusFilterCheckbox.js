import React, { useState } from "react";

function StatusFilterCheckbox({ statusOption, handleChange }) {
    const [checked, isChecked] = useState(statusOption.checked);
    const changeTicked = (option, checkedStatus) => {
        isChecked(checkedStatus);
        handleChange(option, checkedStatus);
    };
    return (
        <label className="checkbox">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => {
                    changeTicked(statusOption.value, e.target.checked);
                }}
            />
            {statusOption.text}
        </label>
    );
}

export default StatusFilterCheckbox;
