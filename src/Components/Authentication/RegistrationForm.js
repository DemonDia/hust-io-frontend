import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../General/Loader";
function RegistrationForm(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const register = async () => {
        setLoading(true);
        await props.registerMethod(name, email, password, confirmPassword)
        setLoading(false)
    };
    return (
        <div className="container is-two-fifths-desktop column">
            <div className="container authFormContainer card">
                <div className="container authForm">
                    <h2 className="title is-2">Sign Up</h2>
                    <div className="field">
                        <p className="control">
                            <label className="label">Name:</label>
                            <input
                                className="input"
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
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
                            <label className="label">Confirm Password:</label>
                            <input
                                className="input"
                                type="password"
                                placeholder="Re-enter password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }}
                            />
                        </p>
                    </div>

                    <button
                        className="button authBtn"
                        onClick={() => {
                            register();
                        }}
                    >
                        Register
                    </button>
                    <p>
                        Already joined us? Login <Link to="/login">here</Link>.
                    </p>
                </div>
            </div>
            {loading ? <Loader text={"Registering ..."} /> : <></>}
        </div>
    );
}

export default RegistrationForm;
