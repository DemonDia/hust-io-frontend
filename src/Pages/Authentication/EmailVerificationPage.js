import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function EmailVerificationPage(props) {
    const { userId, token } = useParams();
    const [verified, setVerified] = useState(false);
    const [verificationFailed, setVerificationFailed] = useState(false);
    useEffect(() => {
        axios
            .put(
                `${process.env.REACT_APP_BACKEND_API}/users/verify/${userId}/${token}`
            )
            .then((res) => {
                if (res.data.success) {
                    setVerificationFailed(false);
                    setVerified(true);
                } else {
                    console.log(res.data.message)
                    setVerificationFailed(true);
                    setVerified(false);
                }
            })
            .catch((err) => {
                console.log(err)
                setVerificationFailed(true);
                setVerified(false);
            });
    }, []);
    return (
        <div className="container">
            {!verified && !verificationFailed ? (
                <h1>Verifying</h1>
            ) : (
                <>
                    {verified && !verificationFailed ? (
                        <h1 className="title">Verified!</h1>
                    ) : (
                        <h1 className="title">Failed to verify</h1>
                    )}
                    <Link to ="/login" className="button">Back to login</Link>
                </>
            )}
        </div>
    );
}

export default EmailVerificationPage;