import React, { useState, useEffect } from "react";
import EventForm from "../../Components/Events/EventForm";
import { defaultAuthCheck, checkRefresh } from "../../AuthCheck";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux";
import axios from "axios";
import Breadcrumbs from "../../Components/General/Breadcrumbs";
import Loader from "../../Components/General/Loader";

axios.defaults.withCredentials = true;
function EditEventPage() {
    const [firstLoad, setFirstLoad] = useState(true);
    const { eventId } = useParams();
    const [loading, setLoading] = useState(true);
    const [currUserId, setCurrUserId] = useState(null);
    const [event, setEvent] = useState(null);
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
            await getCurrentEvent();
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
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // =================methods=================
    const getCurrentEvent = async () => {
        await axios
            .get(process.env.REACT_APP_BACKEND_API + `/events/id/${eventId}`, {
                withCredentials: true,
            })
            .then((res) => {
                if (res.data.success) {
                    setEvent(res.data.data);
                }
            })
            .catch((err) => {});
    };
    const editEvent = async (updatedEvent) => {
        await axios
            .put(
                process.env.REACT_APP_BACKEND_API + `/events/${eventId}`,
                {
                    ...updatedEvent,
                    userId: currUserId,
                },
                { withCredentials: true }
            )
            .then((res) => {
                if (res.data.success) {
                    alert("Successfully updated");
                    navigate("/events");
                } else {
                    alert("Failed to update");
                }
            })
            .catch((err) => {
                alert("Failed to update");
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
                        text: "Edit Event",
                    },
                ]}
            />
            {loading ? (
                <Loader />
            ) : (
                <>
                    <EventForm
                        proceedFunction={editEvent}
                        currentEvent={event}
                        header={"Edit Event"}
                    />
                </>
            )}
        </div>
    );
}

export default EditEventPage;
