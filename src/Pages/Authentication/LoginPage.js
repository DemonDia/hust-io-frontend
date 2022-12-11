import React,{useEffect} from 'react';
import Banner from "../../Components/Authentication/Banner"
import LoginForm from '../../Components/Authentication/LoginForm';
import {loginPageAuthCheck} from "../../AuthCheck"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function LoginPage(props) {
    const navigate = useNavigate();
    const login = async (email,password) => {
        await axios
            .post(process.env.REACT_APP_BACKEND_API + "/users/login", {
                email,
                password,
            })
            .then((res) => {
                if (!res.data.success) {
                    alert(res.data.message);
                } else {
                    localStorage.setItem("loginToken", res.data.token);
                    alert("Logged in")
                    navigate("/home");
                }
            });
    };
    useEffect(() => {
        loginPageAuthCheck(navigate, axios);
    }, []);

    return (
        <div className='columns'>
            <Banner/>
            <LoginForm loginMethod ={login}/>
        </div>
    );
}

export default LoginPage;