import React, { useEffect, useState } from "react";
import { defaultAuthCheck, checkRefresh } from "../../AuthCheck";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux";
import axios from "axios";
import EventList from "../../Components/Events/EventList";
import Breadcrumbs from "../../Components/General/Breadcrumbs";
import Loader from "../../Components/General/Loader";

axios.defaults.withCredentials = true;
function EventListPage() {
    const [firstLoad, setFirstLoad] = useState(true);
    const [loading, setLoading] = useState(true);
    const [currUserId, setCurrUserId] = useState(null);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loadUserEvents = async (currUserId) => {
        const getEventResults = await axios.get(
            process.env.REACT_APP_BACKEND_API + `/events/${currUserId}`,
            {
                withCredentials: true,
            }
        );
        if (getEventResults.data.success) {
            setEvents(getEventResults.data.data);
        }
    };
    const deleteEvent = async (eventId) => {
        await axios
            .delete(process.env.REACT_APP_BACKEND_API + `/events/${eventId}`, {
                data: {
                    userId: currUserId,
                },
                withCredentials: true,
            })
            .then(async (res) => {
                if (res.data.success) {
                    alert("Successfully deleted");
                    await loadUserEvents(currUserId);
                } else {
                    alert("Failed to delete");
                }
            })
            .catch((err) => {
                alert("Failed to delete");
            });
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
            await loadUserEvents(id);
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

    return (
        <div>
            <Breadcrumbs
                links={[
                    { text: "Home", linkDest: "/home" },
                    {
                        text: "Events",
                    },
                ]}
            />
            <h1 className="title is-2">All Events</h1>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <EventList Contents={events} DeleteContent={deleteEvent} />
                </>
            )}
        </div>
    );
}

export default EventListPage;
