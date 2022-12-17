import React, { useState, useEffect } from "react";
import JournalForm from "../../Components/Journal/JournalForm";
import { defaultAuthCheck } from "../../AuthCheck";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ViewJournalEntryPage(props) {
    // const { setLoggedIn,loggedIn } = useContext(NavbarContext);
    const { journalId } = useParams();
    const currentToken = localStorage.getItem("loginToken");
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [journalEntry, setJournalEntry] = useState(null);
    const navigate = useNavigate();
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then(async (result) => {
            if (result.data.success) {
                setUserId(result.data.id);
                await getCurrentJournalEntry();
                setLoading(false);
            }
        });
    };
    useEffect(() => {
        loadPage();
    }, []);
    // =================methods=================
    const getCurrentJournalEntry = async () => {
        await axios
            .get(
                process.env.REACT_APP_BACKEND_API + `/journals/id/${journalId}`,
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                }
            )
            .then((res) => {
                if (res.data.success) {
                    setJournalEntry(res.data.data);
                }
            })
            .catch((err) => {});
    };
    return (
        <div>
            <h1 className="title">View Journal Entry</h1>
            {loading ? (
                <>Loading...</>
            ) : (
                <>
                    <JournalForm currentJournalEntry={journalEntry} />
                </>
            )}
        </div>
    );
}

export default ViewJournalEntryPage;
