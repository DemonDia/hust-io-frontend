import React, { useState } from "react";
import { Link } from "react-router-dom";
function RegistrationForm(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    return (
        <div className="container is-two-fifths-desktop column">
            <div className="container authFormContainer">
                <h2 class="title is-2">Sign Up</h2>
                <div className="container authForm">
                    <div class="field">
                        <p class="control">
                            <label class="label">Name:</label>
                            <input
                                class="input"
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
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
                            <label class="label">Confirm Password:</label>
                            <input
                                class="input"
                                type="password"
                                placeholder="Re-enter password"
                                value={password}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }}
                            />
                        </p>
                    </div>

                    <button class="button authBtn">Register</button>
                    <p>
                        Already joined us? Login <Link to="/login">here</Link>.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegistrationForm;
