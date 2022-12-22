import React from "react";
import { Link } from "react-router-dom";
function OptionBox(props) {
    return (
        <div className="contaner is-quarter-tablet column">
            <Link to={props.option.link}>
                <div className="box optionBox">
                    <h1 className="subtitle">{props.option.name}</h1>
                </div>
            </Link>
        </div>
    );
}

export default OptionBox;
