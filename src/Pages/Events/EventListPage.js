import React, { useEffect, useState } from "react";
import { defaultAuthCheck } from "../../AuthCheck";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EventList from "../../Components/Events/EventList";

function EventListPage(props) {
    const currentToken = localStorage.getItem("loginToken");
    // const { setLoggedIn,loggedIn } = useContext(NavbarContext);
    const [loading, setLoading] = useState(true);
    const { currDate } = useParams();
    const [userId, setUserId] = useState(null);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const tabs = ["Events", "Journal", "Tasks"];
    const loadUserEvents = async (userId) => {
        const getEventResults = await axios.get(
            process.env.REACT_APP_BACKEND_API + `/events/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${currentToken}`,
                },
            }
        );
        console.log(getEventResults.data);
        if (getEventResults.data.success) {
            console.log(getEventResults.data.data);
            setEvents(getEventResults.data.data);
        }
    };
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then(async (result) => {
            if (result.data.success) {
                setUserId(result.data.id);
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
                    userId,
                },
            })
            .then(async (res) => {
                if (res.data.success) {
                    alert("Successfully deleted");
                    await loadUserEvents(userId);
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
            <h1>All Events</h1>
            {loading ? (
                <>Loading ...</>
            ) : (
                <>
                    <EventList
                        Contents={events}
                        RefreshContents={loadUserEvents}
                        DeleteContent={deleteEvent}
                        userId={userId}
                    />
                </>
            )}
        </div>
    );
}

export default EventListPage;
