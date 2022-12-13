import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function EventForm({ proceedFunction, currentEvent }) {
    const [loading, setLoading] = useState(false);
    const [eventName, setEventName] = useState("");
    const [tags, setTags] = useState([]);
    const [dateTime, setDateTime] = useState(null);

    const proceed = async () => {
        if(!dateTime){
            alert("Please fill up the date")
        }
        else{
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
            console.log(date);
            const currEvent = {eventName, date, tags};
            console.log(currEvent)
            await proceedFunction(currEvent);
        }
    };

    return (
        <div className="formContainer container">
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
                    Add
                </button>
                <Link className="button cancelBtn" to="/events">Cancel</Link>
            </div>
        </div>
    );
}

export default EventForm;
