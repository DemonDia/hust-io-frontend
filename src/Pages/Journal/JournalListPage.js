import React, { useEffect, useState } from "react";
import { defaultAuthCheck } from "../../AuthCheck";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import JournalList from "../../Components/Journal/JournalList";
function JournalListPage(props) {
    const currentToken = localStorage.getItem("loginToken");
    // const { setLoggedIn,loggedIn } = useContext(NavbarContext);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
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
                        userId,
                    },
                }
            )
            .then(async (res) => {
                if (res.data.success) {
                    alert("Successfully deleted");
                    await loadUserJournals(userId);
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
