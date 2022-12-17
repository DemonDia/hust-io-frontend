import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import JournalForm from "../../Components/Journal/JournalForm"
import { defaultAuthCheck } from "../../AuthCheck";
import axios from "axios";
function AddJournalPage(props) {
    // const { setLoggedIn,loggedIn } = useContext(NavbarContext);
    const currentToken = localStorage.getItem("loginToken");
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then((result) => {
            if (result.data.success) {
                setUserId(result.data.id);
                console.log("Logged in");
                setLoading(false);
            }
        });
    };
    useEffect(() => {
        loadPage();
    }, []);
    // =================methods=================
    const addNewJournalEntry = async (newJournalEntry) => {
        await axios
            .post(
                process.env.REACT_APP_BACKEND_API + "/journals/",
                {
                    ...newJournalEntry,
                    userId,
                },
                { headers: { Authorization: `Bearer ${currentToken}` } }
            )
            .then((res) => {
                if (res.data.success) {
                    alert("Successfully added");
                    navigate("/journals");
                } else {
                    console.log(res.data.message);
                    alert("Failed to add");
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Failed to add");
            });
    };
    return (
        <div>
            <h1 className="title">Add New Journal Entry</h1>
            {loading ? (
                <>Loading...</>
            ) : (
                <>
                    <JournalForm proceedFunction={addNewJournalEntry} />
                </>
            )}
        </div>
    );
}

export default AddJournalPage;
