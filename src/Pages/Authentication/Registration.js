import React, { useState, useEffect } from "react";
import Banner from "../../Components/Authentication/Banner";
import RegistrationForm from "../../Components/Authentication/RegistrationForm";
import { loginPageAuthCheck } from "../../AuthCheck";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Registration() {
    const navigate = useNavigate();
    // ================helper functions================
    const validateEmail = (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true;
        }
        return false;
    };
    // ================core functions================
    const register = async (name, email, password, confirmPassword) => {
        // check if valid email
        if (!validateEmail(email)) {
            alert("Invalid email");
        }
        // check if username >=6 char
        else if (name.length < 6) {
            alert("Name must be at least 6 characters");
        }
        // check if password >= 8 char
        else if (password.length < 8) {
            alert("Password must be at least 8 characters");
        } else if (!(password == confirmPassword)) {
            alert("Passwords must match");
        } else {
            await axios
                .post(process.env.REACT_APP_BACKEND_API + "/users/", {
                    email,
                    name,
                    password,
                })
                .then((res) => {
                    if (res.data.success) {
                        alert("Account created");
                    } else {
                        alert(res.data.message);
                    }
                })
                .catch((err) => {
                    alert("Account failed to create");
                });
        }
    };
    useEffect(() => {
        loginPageAuthCheck(navigate, axios);
    }, []);

    return (
        <div className="columns">
            <Banner />
            <RegistrationForm registerMethod={register}/>
        </div>
    );
}

export default Registration;
