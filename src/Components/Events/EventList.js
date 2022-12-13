import React from "react";
import { Link } from "react-router-dom";
function EventList({ Contents }) {
    // ============add event============
    const addNewEvent = async (newEvent) => {};
    // ============edit event============
    const editEvent = async (updatedEvent) => {};
    // ============delete event============
    const deleteEvent = async (eventId) => {};
    return (
        <div className="listComponent">
            <h1 className="title">Event List</h1>
            {Contents.map((content) => {
                const { date, eventName, _id } = content;
                const { year, month, day, hour, minute } = date;
                return (
                    <div key={_id} className="listItem">
                        <div className="listItem-contents">
                            <h5 className="subtitle">
                                {eventName} -{" "}
                                {`${year}/${month + 1}/${day} ${hour}:${
                                    minute == 0 ? "00" : minute
                                }`}
                            </h5>
                        </div>
                        <div className="listItem-buttons">
                            <Link>Edit</Link>
                            <Link>Delete</Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default EventList;
