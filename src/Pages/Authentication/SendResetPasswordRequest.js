import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../Components/General/Loader";
 
function SendResetPasswordRequest(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const resetPassEmail = async () => {
        setLoading(true);
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
            navigate("/")
    };

    return (
        <div>
            {loading ? (
                <Loader text={"Sending reset password email ..."} />
            ) : (
                <div className="container authForm card">
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
                        className="button addButton"
                        type="button"
                        onClick={() => {
                            resetPassEmail();
                        }}
                    >
                        Proceed
                    </Link>
                    <Link
                        className="button cancelAuthBtn"
                        type="button"
                        to="/login"
                    >
                        Cancel
                    </Link>
                </div>
            )}
        </div>
    );
}

export default SendResetPasswordRequest;
