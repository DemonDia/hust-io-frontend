import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { redirectAuthCheck } from "../../AuthCheck";
import Loader from "../../Components/General/Loader";
const RedirectPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        redirectAuthCheck(navigate);
    });
    return (
        <div>
            <div className="container">
                <Loader text={"Redirecting..."} />
            </div>
        </div>
    );
};

export default RedirectPage;
