import React, { useEffect, useState, useContext } from "react";
import JournalForm from "../../Components/Journal/JournalForm";
import { defaultAuthCheck } from "../../AuthCheck";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { mainContext } from "../../Contexts/mainContext";
import Breadcrumbs from "../../Components/General/Breadcrumbs";
import Loader from "../../Components/General/Loader";

function ViewJournalEntryPage() {
    const { setUserId } = useContext(mainContext);
    const { journalId } = useParams();
    const currentToken = localStorage.getItem("loginToken");
    const [loading, setLoading] = useState(true);
    const [currUserId, setCurrUserId] = useState(null);
    const [journalEntry, setJournalEntry] = useState(null);
    const navigate = useNavigate();
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then(async (result) => {
            if (result.data.success) {
                setUserId(result.data.id);
                setCurrUserId(result.data.id);
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
            <Breadcrumbs
                links={[
                    { text: "Home", linkDest: "/home" },
                    {
                        text: "Journal Entries",
                        linkDest: "/journals",
                    },
                    {
                        text: "View Journal Entry",
                    },
                ]}
            />
            {loading ? (
                <Loader/>
            ) : (
                <>
                    <JournalForm
                        currentJournalEntry={journalEntry}
                        heading={"View Journal Entry"}
                    />
                </>
            )}
        </div>
    );
}

export default ViewJournalEntryPage;
