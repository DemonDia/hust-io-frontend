import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function EventForm({ proceedFunction, currentEvent,header }) {
    const [eventName, setEventName] = useState("");
    const [tags, setTags] = useState([]);
    const [dateTime, setDateTime] = useState(null);

    const proceed = async () => {
        if (!dateTime) {
            alert("Please fill up the date");
        } else {
            const submitDate = new Date(dateTime);
            const year = submitDate.getFullYear();
            const month = submitDate.getMonth();
            const day = submitDate.getDate();
            const hour = submitDate.getHours();
            const minute = submitDate.getMinutes();
            const date = {
                year,
                month,
                day,
                hour,
                minute,
            };
            const currEvent = { eventName, date, tags };
            await proceedFunction(currEvent);
        }
    };
    useEffect(() => {
        if (currentEvent) {
            const { eventName, tags, date } = currentEvent;
            const { year, month, day, hour, minute } = date;
            const dateTime = `${year}-${month+1}-${day}T${
                hour == 0 ? "00" : hour
            }:${minute}`;
            setEventName(eventName);
            setTags(tags);
            setDateTime(dateTime);
        }
    }, []);

    return (
        <div className="formContainer container">
            <h1 className="title is-2">{header}</h1>
            <div className="container">
                <div className="field">
                    <p className="control">
                        <label className="label">Event Name:</label>
                        <input
                            className="input"
                            type="text"
                            placeholder="Enter event name"
                            value={eventName}
                            onChange={(e) => {
                                setEventName(e.target.value);
                            }}
                        />
                        <label className="label">Event Date and Time:</label>
                        <input
                            className="input"
                            type="datetime-local"
                            placeholder="Select date and time"
                            value={dateTime}
                            onChange={(e) => {
                                setDateTime(e.target.value);
                            }}
                        />
                    </p>
                </div>

                <button
                    className="button authBtn"
                    onClick={() => {
                        proceed();
                    }}
                >
                    {currentEvent ? <>Save</> : <>Add</>}
                </button>
                <Link className="button cancelBtn" to="/events">
                    Cancel
                </Link>
            </div>
        </div>
    );
}

export default EventForm;
