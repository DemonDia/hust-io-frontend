import React, { useState, useEffect } from "react";
import EventForm from "../../Components/Events/EventForm";
import { defaultAuthCheck } from "../../AuthCheck";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditEventPage(props) {
    // const { setLoggedIn,loggedIn } = useContext(NavbarContext);
    const { eventId } = useParams();
    const currentToken = localStorage.getItem("loginToken");
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [event,setEvent] = useState(null)
    const navigate = useNavigate();
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then(async(result) => {
            if (result.data.success) {
                setUserId(result.data.id);
                await getCurrentEvent()
                setLoading(false);
            }
        });
    };
    useEffect(() => {
        loadPage();
    }, []);

    // =================methods=================
    const getCurrentEvent = async () => {
        await axios
            .get(
                process.env.REACT_APP_BACKEND_API +
                    `/events/id/${eventId}`,
                { headers: { Authorization: `Bearer ${currentToken}` } }
            )
            .then((res) => {
                if (res.data.success) {
                    setEvent(res.data.data);
                }
            })
            .catch((err) => {});
    };
    const editEvent = async (updatedEvent) => {
        // console.log(updatedEvent.date)
        // updatedEvent["date"]["month"] = updatedEvent.date.month += 1;
        await axios
            .put(
                process.env.REACT_APP_BACKEND_API + `/events/${eventId}`,
                {
                    ...updatedEvent,
                    userId,
                },
                { headers: { Authorization: `Bearer ${currentToken}` } }
            )
            .then((res) => {
                if (res.data.success) {
                    alert("Successfully updated");
                    navigate("/events");
                } else {
                    console.log(res.data.message);
                    alert("Failed to add");
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Failed to update");
            });
    };

    return (
        <div>
            <h1 className="title">Edit Event</h1>
            {loading ? (
                <>Loading...</>
            ) : (
                <>
                    <EventForm proceedFunction={editEvent} currentEvent={event}/>
                </>
            )}
        </div>
    );
}

export default EditEventPage;
