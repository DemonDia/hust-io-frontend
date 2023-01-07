import React, { useEffect, useState } from "react";
import { defaultAuthCheck, checkRefresh } from "../../AuthCheck";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux";
import axios from "axios";
import JournalList from "../../Components/Journal/JournalList";
import Breadcrumbs from "../../Components/General/Breadcrumbs";
import Loader from "../../Components/General/Loader";

axios.defaults.withCredentials = true;
function JournalListPage() {
    const [firstLoad, setFirstLoad] = useState(true);
    const [loading, setLoading] = useState(true);
    const [currUserId, setCurrUserId] = useState(null);
    const [journals, setJournals] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loadUserJournals = async (userId) => {
        const getEventResults = await axios.get(
            process.env.REACT_APP_BACKEND_API + `/journals/${userId}`,
            {
                withCredentials: true,
            }
        );
        if (getEventResults.data.success) {
            setJournals(getEventResults.data.data);
        }
    };
    const firstTimeLoad = async () => {
        await defaultAuthCheck(navigate).then((result) => {
            loadPage(result);
        });
    };
    const loadPage = async (result) => {
        if (result.status == 200) {
            dispatch(authActions.login());
            const { _id: id } = result.data.existingUser;
            setCurrUserId(id);
            // get journal entries
            await loadUserJournals(id);
            setLoading(false);
        }
    };
    const deleteJournal = async (journalId) => {
        await axios
            .delete(
                process.env.REACT_APP_BACKEND_API + `/journals/${journalId}`,
                {
                    data: {
                        userId: currUserId,
                    },
                },
                {
                    withCredentials: true,
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
        if (firstLoad) {
            setFirstLoad(false);
            firstTimeLoad();
        }
        let interval = setInterval(() => {
            checkRefresh().then((result) => loadPage(result));
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div>
            <Breadcrumbs
                links={[
                    { text: "Home", linkDest: "/home" },
                    {
                        text: "Journal Entries",
                    },
                ]}
            />
            <h1 className="title is-2">All Journal Entries</h1>
            {loading ? (
                <Loader />
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
