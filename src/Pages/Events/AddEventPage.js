import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EventForm from "../../Components/Events/EventForm";
import { defaultAuthCheck } from "../../AuthCheck";
import axios from "axios";
function AddEventPage(props) {
    // const { setLoggedIn,loggedIn } = useContext(NavbarContext);
    const currentToken = localStorage.getItem("loginToken");
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then((result) => {
            if (result.data.success) {
                setUserId(result.data.id);
                console.log("Logged in");
                setLoading(false);
            }
        });
    };
    useEffect(() => {
        loadPage();
    }, []);

    // =================methods=================
    const addNewEvent = async (newEvent) => {
        await axios
            .post(
                process.env.REACT_APP_BACKEND_API + "/events/",
                {
                    ...newEvent,
                    userId,
                },
                { headers: { Authorization: `Bearer ${currentToken}` } }
            )
            .then((res) => {
                if (res.data.success) {
                    alert("Successfully added");
                    navigate("/events");
                } else {
                    console.log(res.data.message)
                    alert("Failed to add");
                }
            })
            .catch((err) => {
                console.log(err)
                alert("Failed to add");
            });
    };
    return (
        <div>
            <h1 className="title">Add New Event</h1>
            {loading ? (
                <>Loading...</>
            ) : (
                <>
                    <EventForm proceedFunction={addNewEvent} />
                </>
            )}
        </div>
    );
}

export default AddEventPage;
