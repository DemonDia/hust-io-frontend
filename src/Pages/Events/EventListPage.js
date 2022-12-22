import React, { useEffect, useState, useContext } from "react";
import { defaultAuthCheck } from "../../AuthCheck";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EventList from "../../Components/Events/EventList";
import { mainContext } from "../../Contexts/mainContext";
import Breadcrumbs from "../../Components/General/Breadcrumbs";

function EventListPage(props) {
    const currentToken = localStorage.getItem("loginToken");
    const { setUserId } = useContext(mainContext);
    const [loading, setLoading] = useState(true);
    const [currUserId, setCurrUserId] = useState(null);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const loadUserEvents = async (currUserId) => {
        const getEventResults = await axios.get(
            process.env.REACT_APP_BACKEND_API + `/events/${currUserId}`,
            {
                headers: {
                    Authorization: `Bearer ${currentToken}`,
                },
            }
        );
        if (getEventResults.data.success) {
            setEvents(getEventResults.data.data);
        }
    };
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then(async (result) => {
            if (result.data.success) {
                setUserId(result.data.id);
                setCurrUserId(result.data.id);
                // get events
                await loadUserEvents(result.data.id);
                setLoading(false);
            }
        });
    };
    const deleteEvent = async (eventId) => {
        await axios
            .delete(process.env.REACT_APP_BACKEND_API + `/events/${eventId}`, {
                headers: { Authorization: `Bearer ${currentToken}` },
                data: {
                    userId: currUserId,
                },
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
                <>Loading ...</>
            ) : (
                <>
                    <EventList Contents={events} DeleteContent={deleteEvent} />
                </>
            )}
        </div>
    );
}

export default EventListPage;
