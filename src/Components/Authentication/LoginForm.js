import React, { useState } from "react";
import { Link } from "react-router-dom";

function LoginForm(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = async () => {
        await props.loginMethod(email, password);
    };
    return (
        <div className="container is-two-fifths-desktop column">
            <div className="container authFormContainer">
                <h2 className="title is-2">Sign In</h2>
                <div className="container authForm">
                    <div className="field">
                        <p className="control">
                            <label className="label">Email:</label>
                            <input
                                className="input"
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <label className="label">Password:</label>
                            <input
                                className="input"
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </p>
                    </div>

                    <button
                        className="button authBtn"
                        onClick={() => {
                            login();
                        }}
                    >
                        Login
                    </button>
                    <p>
                        Forgot your password? Click <Link to="/forgotpass">here</Link>.
                    </p>
                    <p>
                        Haven't joined us? Register{" "}
                        <Link to="/register">here</Link>.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
