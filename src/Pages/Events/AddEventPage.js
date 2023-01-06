import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventForm from "../../Components/Events/EventForm";
import { defaultAuthCheck } from "../../AuthCheck";
import axios from "axios";
import Breadcrumbs from "../../Components/General/Breadcrumbs";
import Loader from "../../Components/General/Loader";
axios.defaults.withCredentials = true;
function AddEventPage() {
    const [loading, setLoading] = useState(true);
    const [currUserId, setCurrUserId] = useState(null);
    const navigate = useNavigate();
    const loadPage = async () => {
        await defaultAuthCheck(navigate).then((result) => {
            if (result.status == 200) {
                const { _id: id } = result.data.existingUser;
                setCurrUserId(id);
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
