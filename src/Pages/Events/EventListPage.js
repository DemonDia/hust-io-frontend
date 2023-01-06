import React, { useEffect, useState } from "react";
import { defaultAuthCheck } from "../../AuthCheck";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EventList from "../../Components/Events/EventList";
import Breadcrumbs from "../../Components/General/Breadcrumbs";
import Loader from "../../Components/General/Loader";
axios.defaults.withCredentials = true;
function EventListPage() {
    const [loading, setLoading] = useState(true);
    const [currUserId, setCurrUserId] = useState(null);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
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
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then(async (result) => {
            if (result.status == 200) {
                const { _id: id } = result.data.existingUser;
                setCurrUserId(id);
                await loadUserEvents(id);
                setLoading(false);
            }
        });
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
    useEffect(() => {
        loadPage();
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
