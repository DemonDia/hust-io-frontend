import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { defaultAuthCheck } from "../../AuthCheck";
import axios from "axios";
import Cookies from "universal-cookie";

import Loader from "../../Components/General/Loader";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux";

axios.defaults.withCredentials = true;

function LogoutPage() {
    const cookie = new Cookies();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loadPage = async () => {
        await defaultAuthCheck(navigate).then(async (result) => {
            if (result.status == 200) {
                cookie.remove("currentUser")
                dispatch(authActions.logout());
                alert("Successfully logged out!");
                navigate("/login");
            }
        });
    };
    useEffect(() => {
        loadPage();
    }, []);
    return (
        <div>
            <Loader text={"Logging Out ..."} />
        </div>
    );
}

export default LogoutPage;
