import React, { useEffect } from "react";
import Banner from "../../Components/Authentication/Banner";
import LoginForm from "../../Components/Authentication/LoginForm";
import { loginPageAuthCheck } from "../../AuthCheck";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux";
import Cookies from "universal-cookie";
import axios from "axios";
axios.defaults.withCredentials = true;

function LoginPage() {
    const cookies = new Cookies();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const login = async (email, password) => {
        await axios
            .post(
                process.env.REACT_APP_BACKEND_API + "/users/login",
                {
                    email,
                    password,
                },
                { withCredentials: true, credentials: "include" }
            )
            .then((res) => {
                if (res.status != 200) {
                    alert("Login failed");
                } else {
                    const { user, token } = res.data;
                    cookies.set("currentUser",token,{
                        expires:new Date(Date.now() + 1000 * 30),
                    });
                    alert("Logged in");
                    dispatch(authActions.login());
                    navigate("/home");
                }
            })
            .catch((err) => {
                alert("Login failed");
            });
    };
    useEffect(() => {
        loginPageAuthCheck(navigate, axios);
    }, []);

    return (
        <div className="columns">
            <Banner />
            <LoginForm loginMethod={login} />
        </div>
    );
}

export default LoginPage;
