import React, { useEffect, useState } from "react";
import { defaultAuthCheck, checkRefresh } from "../../AuthCheck";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux";
import axios from "axios";
import Cookies from "universal-cookie";
import Breadcrumbs from "../../Components/General/Breadcrumbs";
import Loader from "../../Components/General/Loader";

axios.defaults.withCredentials = true;
function UserProfile() {
    const cookies = new Cookies();
    const currentToken = cookies.get("currentUser");
    const [firstLoad, setFirstLoad] = useState(true);
    const [currUserId, setCurrUserId] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const firstTimeLoad = async () => {
        await defaultAuthCheck(navigate).then((result) => {
            loadPage(result);
        });
    };

    const loadPage = async (result) => {
        if (result.status == 200) {
            dispatch(authActions.login());
            const { _id: id, name, email } = result.data.existingUser;
            setCurrUserId(id);
            setName(name);
            setEmail(email);
            setLoading(false);
        }
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
                        userId: currUserId,
                    },
                    {
                        headers: { Authorization: `Bearer ${currentToken}` },
                    }
                )
                .then((res) => {
                    console.error(res);
                    if (res.data.success) {
                        alert("Name successfully saved");
                    } else {
                        alert("Failed to save");
                    }
                })
                .catch((err) => {
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
                .post(
                    process.env.REACT_APP_BACKEND_API + "/users/changepass",
                    {
                        newPassword,
                        userId: currUserId,
                    },
                    {
                        headers: { Authorization: `Bearer ${currentToken}` },
                    }
                )
                .then((res) => {
                    console.error(res);
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
                    process.env.REACT_APP_BACKEND_API + `/users/${currUserId}`,
                    {
                        headers: { Authorization: `Bearer ${currentToken}` },
                    }
                )
                .then((res) => {
                    if (res.data.success) {
                        alert("Account successfully deleted");
                        navigate("/logout");
                    } else {
                        alert("Failed to delete");
                    }
                })
                .catch((err) => {
                    alert("Failed to delete");
                });
        }
    };

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            firstTimeLoad();
        }
        let interval = setInterval(() => {
            checkRefresh().then((result) => loadPage(result));
        }, 1000 * 10);
        return () => clearInterval(interval);
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
                <Loader />
            ) : (
                <>
                    <div className="card formContainer">
                        <h1 className="title is-2">User Profile</h1>
                        <hr />
                        <div className="field">
                            <h1 className="title is-4 is-spaced">User Info</h1>
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
                                <button
                                    className="button authBtn"
                                    onClick={() => {
                                        saveUsername();
                                    }}
                                >
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
                                <h1 className="title is-4 is-spaced">
                                    Change Password
                                </h1>
                                <label className="label">New Password: </label>
                                <input
                                    className="input"
                                    type="password"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                    }}
                                />
                                <label className="label">
                                    Confirm New Password:
                                </label>
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
                        <button
                            className="button authBtn"
                            onClick={() => {
                                savePassword();
                            }}
                        >
                            Change Password
                        </button>
                        <label className="label"></label>
                        <button
                            className="button dangerButton authBtn"
                            onClick={() => {
                                deleteAccount();
                            }}
                        >
                            Delete Account
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default UserProfile;
