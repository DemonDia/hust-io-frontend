import React from "react";
import { Link } from "react-router-dom";
function OptionBox({option}) {
    return (
        <div className="contaner is-quarter-tablet column">
            <Link to={option.link}>
                <div className="box optionBox">
                    <h1 className="subtitle">{option.name}</h1>
                </div>
            </Link>
        </div>
    );
}

export default OptionBox;
