import React, { useEffect, useState } from "react";
import JournalForm from "../../Components/Journal/JournalForm";
import { defaultAuthCheck, checkRefresh } from "../../AuthCheck";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux";

import axios from "axios";
import Breadcrumbs from "../../Components/General/Breadcrumbs";
import Loader from "../../Components/General/Loader";
axios.defaults.withCredentials = true;
function ViewJournalEntryPage() {
    const { journalId } = useParams();
    const [firstLoad, setFirstLoad] = useState(true);
    const [loading, setLoading] = useState(true);
    const [currUserId, setCurrUserId] = useState(null);
    const [journalEntry, setJournalEntry] = useState(null);
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
            const { _id: id } = result.data.existingUser;
            setCurrUserId(id);
            await getCurrentJournalEntry();
            setLoading(false);
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
    // =================methods=================
    const getCurrentJournalEntry = async () => {
        await axios
            .get(
                process.env.REACT_APP_BACKEND_API + `/journals/id/${journalId}`,
                { withCredentials: true }
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
                <Loader />
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
