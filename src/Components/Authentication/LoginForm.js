import React, { useState } from "react";
import { Link } from 'react-router-dom';

function LoginForm(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="container is-two-fifths-desktop column">
            <div className="container authFormContainer">
                <h2 class="title is-2">Sign In</h2>
                <div className="container authForm">
                    <div class="field">
                        <p class="control">
                            <label class="label">Email:</label>
                            <input
                                class="input"
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <label class="label">Password:</label>
                            <input
                                class="input"
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </p>
                    </div>

                    <button class="button authBtn">Login</button>
                    <p>Forgot your password? Click <Link>here</Link>.</p>
                    <p>Haven't joined us? Register <Link to ="/register">here</Link>.</p>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
