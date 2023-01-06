import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { defaultAuthCheck } from "../../AuthCheck";

function ErrorPage() {

    const navigate = useNavigate();
    const loadPage = async () => {
        await defaultAuthCheck(navigate);
    };
    useEffect(() => {
        loadPage();
    });
    return (
        <div>
            <div className="authForm card container">
                <h1 className="title">Hello, there is nothing to look here.</h1>
                <Link to="/" type="button" className="button addButton">
                    Back
                </Link>
            </div>
        </div>
    );
}

export default ErrorPage;
