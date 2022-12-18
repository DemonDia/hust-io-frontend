import React, { useEffect, useState,useContext } from "react";
import { defaultAuthCheck } from "../../AuthCheck";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import JournalList from "../../Components/Journal/JournalList";
import { mainContext } from "../../Contexts/mainContext";

function JournalListPage(props) {
    const currentToken = localStorage.getItem("loginToken");
    const { setUserId } = useContext(mainContext);
    const [loading, setLoading] = useState(true);
    const [currUserId, setCurrUserId] = useState(null);
    const [journals, setJournals] = useState([]);
    const navigate = useNavigate();
    const loadUserJournals = async (userId) => {
        const getEventResults = await axios.get(
            process.env.REACT_APP_BACKEND_API + `/journals/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${currentToken}`,
                },
            }
        );
        if (getEventResults.data.success) {
            setJournals(getEventResults.data.data);
        }
    };
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then(async (result) => {
            if (result.data.success) {
                setUserId(result.data.id);
                setCurrUserId(result.data.id);

                // get journal entries
                await loadUserJournals(result.data.id);
                setLoading(false);
            }
        });
    };
    const deleteJournal = async (journalId) => {
        await axios
            .delete(
                process.env.REACT_APP_BACKEND_API + `/journals/${journalId}`,
                {
                    headers: { Authorization: `Bearer ${currentToken}` },
                    data: {
                        userId:currUserId,
                    },
                }
            )
            .then(async (res) => {
                if (res.data.success) {
                    alert("Successfully deleted");
                    await loadUserJournals(currUserId);
                } else {
                    alert("Failed to delete");
                }
            })
            .catch((err) => {
                alert("Failed to delete");
            });
    };
    useEffect(() => {
        loadPage();
    }, []);
    return (
        <div>
            <h1 className="title">All Journal Entries</h1>
            {loading ? (
                <>Loading ...</>
            ) : (
                <>
                    <JournalList
                        Contents={journals}
                        DeleteContent={deleteJournal}
                    />
                </>
            )}
        </div>
    );
}

export default JournalListPage;
