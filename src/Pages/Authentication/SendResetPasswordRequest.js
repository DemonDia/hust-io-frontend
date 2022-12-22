import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function SendResetPasswordRequest(props) {
    const [email, setEmail] = useState("");
    const resetPassEmail = async () => {
        await axios
            .put(process.env.REACT_APP_BACKEND_API + "/users/resetpass", {
                email,
            })
            .then((res) => {
                alert("Password reset email sent.");
            })
            .catch((err) => {
                alert("Password reset email sent.");
            });
    };

    return (
        <div>
            <div className="container authForm">
                <h1 className="title is-2">Reset password</h1>
                <label className="label">Email:</label>
                <input
                    className="input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <Link
                    className="button is-link"
                    type="button"
                    onClick={() => {
                        resetPassEmail();
                    }}
                >
                    Proceed
                </Link>
                <br></br>
                <Link
                    className="button cancelAuthBtn"
                    type="button"
                    to="/login"
                >
                    Cancel
                </Link>
            </div>
        </div>
    );
}

export default SendResetPasswordRequest;
