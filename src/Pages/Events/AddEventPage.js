import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventForm from "../../Components/Events/EventForm";
import { defaultAuthCheck, checkRefresh } from "../../AuthCheck";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux";
import axios from "axios";
import Breadcrumbs from "../../Components/General/Breadcrumbs";
import Loader from "../../Components/General/Loader";
axios.defaults.withCredentials = true;
function AddEventPage() {
    const [firstLoad, setFirstLoad] = useState(true);
    const [loading, setLoading] = useState(true);
    const [currUserId, setCurrUserId] = useState(null);
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
    const addNewEvent = async (newEvent) => {
        await axios
            .post(
                process.env.REACT_APP_BACKEND_API + "/events/",
                {
                    ...newEvent,
                    userId: currUserId,
                },
                { withCredentials: true }
            )
            .then((res) => {
                if (res.data.success) {
                    alert("Successfully added");
                    navigate("/events");
                } else {
                    alert("Failed to add");
                }
            })
            .catch((err) => {
                alert("Failed to add");
            });
    };
    return (
        <div>
            <Breadcrumbs
                links={[
                    { text: "Home", linkDest: "/home" },
                    {
                        text: "Events",
                        linkDest: "/events",
                    },
                    {
                        text: "Add Event",
                    },
                ]}
            />
            {loading ? (
                <Loader />
            ) : (
                <>
                    <EventForm
                        proceedFunction={addNewEvent}
                        header={"Add New Event"}
                    />
                </>
            )}
        </div>
    );
}

export default AddEventPage;
