import React,{useEffect} from 'react';
import Banner from "../../Components/Authentication/Banner"
import LoginForm from '../../Components/Authentication/LoginForm';
import {loginPageAuthCheck} from "../../AuthCheck"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { authActions } from '../../redux';
import axios from 'axios';
axios.defaults.withCredentials = true;

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const login = async (email,password) => {
        await axios
            .post(process.env.REACT_APP_BACKEND_API + "/users/login", {
                email,
                password,
            })
            .then((res) => {
                if (res.status != 200) {
                    alert("Login failed");
                } else {
                    alert("Logged in")
                    dispatch(authActions.login())
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