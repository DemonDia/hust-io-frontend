import React, { useEffect, useState, useContext } from "react";
import { defaultAuthCheck } from "../../AuthCheck";
import { useNavigate } from "react-router-dom";
import { mainContext } from "../../Contexts/mainContext";
import axios from "axios";
import Breadcrumbs from "../../Components/General/Breadcrumbs";
function UserProfile(props) {
    const token = localStorage.getItem("loginToken");
    const { setUserId, userId } = useContext(mainContext);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then((result) => {
            if (result.data.success) {
                const { id, name, email } = result.data;
                setUserId(id);
                setName(name);
                setEmail(email);
                setLoading(false);
            }
        });
    };

    const saveUsername = async () => {
        if (!name || name.length == 0) {
            alert("Updated name cannot be blank");
        } else {
            axios
                .put(
                    process.env.REACT_APP_BACKEND_API + "/users/changename",
                    {
                        name,
                        userId,
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                .then((res) => {
                    if (res.data.success) {
                        alert("Name successfully saved");
                    } else {
                        console.log(res.data);
                        alert("Failed to save");
                    }
                })
                .catch((err) => {
                    console.log(err)
                    alert("Failed to save");
                });
        }
    };
    const savePassword = async () => {
        if (!newPassword) {
            alert("New password cannot be blank");
        } else if (newPassword.length < 8) {
            alert("New pasword must be at least 8 characters");
        } else if (!confirmNewPassword) {
            alert("Please type in your new password again.");
        } else if (newPassword != confirmNewPassword) {
            alert("Both passwords must match");
        } else {
            axios
                .post(process.env.REACT_APP_BACKEND_API + "/users/changepass", {
                    newPassword,
                    userId,
                    token,
                })
                .then((res) => {
                    setNewPassword("");
                    setConfirmNewPassword("");
                    alert("Password reset sucessfully.");
                })
                .catch((err) => {
                    alert("Failed to reset password");
                });
        }
    };
    const deleteAccount = async () => {
        var confirmDelete = prompt(
            "Are you sure? Type 'yes' to proceed. ALL your records will be gone FOREVER. This is IRREVERSABLE!"
        );
        if (confirmDelete == "yes") {
            await axios
                .delete(
                    process.env.REACT_APP_BACKEND_API + `/users/${userId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
                .then((res) => {
                    if (res.data.success) {
                        alert("Account successfully deleted");
                        navigate("/logout");
                    } else {
                        console.log(res.data);
                        alert("Failed to delete");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    alert("Failed to delete");
                });
        }
    };

    useEffect(() => {
        loadPage();
    }, []);
    return (
        <div>
            <Breadcrumbs
                links={[
                    { text: "Home", linkDest: "/home" },
                    {
                        text: "User Profile",
                    },
                ]}
            />

            {loading ? (
                <>Loading...</>
            ) : (
                <>
                    <div className="container card formContainer">
                        <h1 className="title is-2">User profile</h1>
                        <div className="field">
                            <p className="control">
                                <label className="label">Name:</label>
                                <input
                                    className="input"
                                    placeholder="Enter new name"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                                <label className="label"></label>
                                <button className="button authBtn"
                                onClick={()=>{saveUsername()}}>
                                    Change Name
                                </button>
                                <label className="label">Email:</label>
                                <input
                                    className="input"
                                    placeholder="Enter new email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    disabled
                                />
                                <hr></hr>
                                <label className="title is-5">
                                    Only if you want to change password
                                </label>
                                <label className="label">Password:</label>
                                <input
                                    className="input"
                                    type="password"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                    }}
                                />
                                <label className="label">Name:</label>
                                <input
                                    className="input"
                                    type="password"
                                    placeholder="Re-enter new name"
                                    value={confirmNewPassword}
                                    onChange={(e) => {
                                        setConfirmNewPassword(e.target.value);
                                    }}
                                />
                            </p>
                        </div>
                        <button className="button authBtn"
                        onClick={()=>{savePassword()}}>
                            Change Password
                        </button>
                        <label className="label"></label>
                        <button className="button is-danger authBtn"
                        onClick={()=>{deleteAccount()}}>
                            Delete Account
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default UserProfile;
